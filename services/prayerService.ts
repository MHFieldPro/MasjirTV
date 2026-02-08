
import { GoogleGenAI, Type } from "@google/genai";
import { PrayerSchedule } from "../types";

export async function fetchCICSWPrayerData(): Promise<PrayerSchedule | null> {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `
      Access https://cicsw.ca/ and extract the prayer times for TODAY at the Cambridge Islamic Centre.
      Return the data in a clean JSON format.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            fajr: { type: Type.STRING },
            sunrise: { type: Type.STRING },
            dhuhr: { type: Type.STRING },
            asr: { type: Type.STRING },
            maghrib: { type: Type.STRING },
            isha: { type: Type.STRING },
            date: { type: Type.STRING, description: "The date these times are for" }
          },
          required: ["fajr", "sunrise", "dhuhr", "asr", "maghrib", "isha"]
        }
      },
    });

    const data = JSON.parse(response.text || "{}");
    return data as PrayerSchedule;
  } catch (error) {
    console.error("Failed to fetch prayer data:", error);
    return null;
  }
}

// Helper to format the schedule for the ticker
export function formatPrayerTicker(schedule: PrayerSchedule): string {
  const getTime = (prayer: any) => typeof prayer === 'string' ? prayer : prayer.adhan;
  return `Fajr: ${getTime(schedule.fajr)} • Sunrise: ${getTime(schedule.sunrise)} • Dhuhr: ${getTime(schedule.dhuhr)} • Asr: ${getTime(schedule.asr)} • Maghrib: ${getTime(schedule.maghrib)} • Isha: ${getTime(schedule.isha)}`;
}
