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
