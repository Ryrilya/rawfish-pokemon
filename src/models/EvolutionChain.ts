import { Item } from './Item';
import { PokemonSpecies, Name } from './PokemonSpecies';
import { Type } from './Type';
import { Move } from './Move';
import { Location } from './Location';

export interface EvolutionChain {
  baby_trigger_item?: Item;
  chain: ChainLink;
  id: number;
}

export interface ChainLink {
  evolution_details: EvolutionDetail[];
  evolves_to: ChainLink[];
  is_baby: boolean;
  species: {
    name: string;
    url: string;
  };
}

export interface EvolutionDetail {
  gender?: number;
  held_item?: Item;
  item?: Item;
  known_move?: Move;
  known_move_type?: Type;
  location?: Location;
  min_affection?: number;
  min_beauty?: number;
  min_happiness?: number;
  min_level: number;
  needs_overworld_rain: boolean;
  party_species?: PokemonSpecies;
  party_type?: Type;
  relative_physical_stats?: number;
  time_of_day: string;
  trade_species?: PokemonSpecies;
  trigger: EvolutionTrigger;
  turn_upside_down: boolean;
}

interface EvolutionTrigger {
  id: number;
  name: string;
  names: Name[];
  pokemon_species: PokemonSpecies[];
}