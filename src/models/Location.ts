import { Name } from './PokemonSpecies';

export interface Location {
  areas: Area[];
  game_indices: Gameindex[];
  id: number;
  name: string;
  names: Name[];
  region: Area;
}

interface Gameindex {
  game_index: number;
  generation: Area;
}

interface Area {
  name: string;
  url: string;
}