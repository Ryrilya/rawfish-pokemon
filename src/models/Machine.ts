import { Source } from "./APIResponse";
import { Move } from "./Move";
import { Ability } from "./Pokemon";
import { Name, PokemonSpecies } from "./PokemonSpecies";
import { Type } from "./Type";

export interface Machine {
  id: number;
  item: Source;
  move: Move;
  version_group: VersionGroup;
}

export interface MachineSource {
  machine: {
    url: string;
  },
  version_group: Source;
}

interface VersionGroup {
  id: number;
  name: string;
  order: number;
  generation: Generation;
  move_learn_methods: MoveLearnMethod[];
  pokedexes: Pokedex[];
  regions: Region[];
  versions: Version[];
}

interface Version {
  id: number;
  name: string;
  names: Name[];
  version_group: VersionGroup;
}

interface Generation {
  id: number;
  name: string;
  abilities: Ability[];
  names: Name[];
  main_region: Region;
  moves: Move[];
  pokemon_species: PokemonSpecies[];
  types: Type[];
  version_groups: VersionGroup[];
}

interface MoveLearnMethod {
  id: number;
  name: string;
  descriptions: Description[];
  names: Name[];
  version_groups: VersionGroup[];
}

interface Region {
  id: number;
  locations: Location[];
  name: string;
  names: Name[];
  main_generation: Generation;
  pokedexes: Pokedex[];
  version_groups: VersionGroup[];
}

interface Pokedex {
  id: number;
  name: string;
  is_main_series: boolean;
  descriptions: Description[];
  names: Name[];
  pokemon_entries: PokemonEntry[];
}

interface Description {
  description: string;
  language: Language;
}

interface Language {
  id: number;
  name: string;
  official: boolean;
  iso639: string;
  iso3166: string;
  names: Name[];
}

interface PokemonEntry {
  entry_number: number;
  pokemon_species: PokemonSpecies;
}