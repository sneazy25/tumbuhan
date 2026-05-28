export type Language = "id" | "en";

export interface Prediction {
  is_healthy: boolean;
  plant: string;
  disease: string;
  confidence: number;
}
