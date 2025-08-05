
import { GoogleGenAI, Type } from "@google/genai";
import type { ChargingStation } from '../types';
import { ChargerType, StationStatus } from '../types';

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}
const ai = new GoogleGenAI({ apiKey: API_KEY });

const stationSchema = {
    type: Type.OBJECT,
    properties: {
        id: { type: Type.STRING, description: 'A unique identifier for the station, like a UUID.' },
        name: { type: Type.STRING, description: 'The name of the charging station, e.g., "ChargeGrid Koramangala".' },
        address: { type: Type.STRING, description: 'The street address of the station.' },
        city: { type: Type.STRING, description: 'The city where the station is located.' },
        latitude: { type: Type.NUMBER, description: 'The geographical latitude.' },
        longitude: { type: Type.NUMBER, description: 'The geographical longitude.' },
        chargerType: {
            type: Type.ARRAY,
            description: 'An array of charger types available.',
            items: {
                type: Type.STRING,
                enum: Object.values(ChargerType)
            }
        },
        status: {
            type: Type.STRING,
            description: 'The current operational status of the station.',
            enum: Object.values(StationStatus)
        },
        connectorTypes: {
            type: Type.ARRAY,
            description: 'An array of connector types, e.g., "CCS-2", "CHAdeMO", "Type 2 AC".',
            items: { type: Type.STRING }
        }
    },
    required: ["id", "name", "address", "city", "latitude", "longitude", "chargerType", "status", "connectorTypes"]
};

export const fetchChargingStations = async (city: string): Promise<ChargingStation[]> => {
    const prompt = `Generate a list of 15 fictional but realistic EV charging stations in ${city}, India. Provide varied statuses and charger types. Ensure latitude and longitude are within the realistic geographical bounds of the city.`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: stationSchema
                }
            }
        });

        const responseText = response.text.trim();
        const stationsData = JSON.parse(responseText);
        
        // Validate and cast the data to ensure it matches the ChargingStation type
        return stationsData.map((station: any) => ({
          ...station,
          chargerType: station.chargerType as ChargerType[],
          status: station.status as StationStatus,
        })) as ChargingStation[];

    } catch (error) {
        console.error("Error fetching charging stations from Gemini API:", error);
        throw new Error("Failed to fetch or parse charging station data.");
    }
};
