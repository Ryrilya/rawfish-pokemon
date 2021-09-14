export interface IAPIResponse {
  count: number;
  next: string;
  previous?: any;
  results: ISource[];
}

export interface ISource {
  name: string;
  url: string;
}