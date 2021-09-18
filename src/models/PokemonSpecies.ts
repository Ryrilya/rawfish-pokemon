import { Source } from './APIResponse';

export interface PokemonSpecies {
  base_happiness: number;
  capture_rate: number;
  color: Source;
  egg_groups: Source[];
  evolution_chain: {
    url: string;
  };
  evolves_from_species?: Source;
  flavor_text_entries: FlavorTextEntry[];
  form_descriptions: any[];
  forms_switchable: boolean;
  gender_rate: number;
  genera: Genera[];
  generation: Source;
  growth_rate: Source;
  habitat: Source;
  has_gender_differences: boolean;
  hatch_counter: number;
  id: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  name: string;
  names: Name[];
  order: number;
  pal_park_encounters: PalParkEncounter[];
  pokedex_numbers: PokedexNumber[];
  shape: Source;
  varieties: Variety[];
}

interface FlavorTextEntry {
  flavor_text: string;
  language: Source;
  version: Source;
}

interface Genera {
  genus: string;
  language: Source;
}

export interface Name {
  language: Source;
  name: string;
}

interface PalParkEncounter {
  area: Source;
  base_score: number;
  rate: number;
}

interface PokedexNumber {
  entry_number: number;
  pokedex: Source;
}

interface Variety {
  is_default: boolean;
  pokemon: Source;
}
