export interface IAPIResponse {
  count: number;
  next: string;
  previous?: any;
  results: Source[];
}

export interface Source {
  name: string;
  url: string;
}