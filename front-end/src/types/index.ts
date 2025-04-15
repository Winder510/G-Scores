export interface IBackendRes<T> {
  error?: string | string[];
  message: string;
  statusCode: number | string;
  data?: T;
}

export interface StudentScore {
  id: string;
  registration_number: string;
  math: number;
  literature: number;
  foreign_language: number;
  physics: number;
  chemistry: number;
  biology: number;
  history: number;
  geography: number;
  civic_education: number;
}

export interface ScoreLevel {
  ">=8": number;
  "6-8": number;
  "4-6": number;
  "<4": number;
}

export interface ScoreStatistics {
  math: ScoreLevel;
  literature: ScoreLevel;
  foreign_language: ScoreLevel;
  physics: ScoreLevel;
  chemistry: ScoreLevel;
  biology: ScoreLevel;
  history: ScoreLevel;
  geography: ScoreLevel;
  civic_education: ScoreLevel;
}

export interface TopStudent {
  registration_number: string;
  math: number;
  physics: number;
  chemistry: number;
  total: number;
}
