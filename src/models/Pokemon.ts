import { Source } from './APIResponse';

export interface Pokemon {
  abilities: Ability[];
  base_experience: number;
  forms: Source[];
  game_indices: Gameindex[];
  height: number;
  held_items: Helditem[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: MoveSource[];
  name: string;
  order: number;
  past_types: any[];
  species: Source;
  sprites: Sprites;
  stats: Stat[];
  types: TypePokemon[];
  weight: number;
}

export interface TypePokemon {
  slot: number;
  type: Source;
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: Source;
}

interface Sprites {
  back_default: string;
  back_female?: any;
  back_shiny: string;
  back_shiny_female?: any;
  front_default: string;
  front_female?: any;
  front_shiny: string;
  front_shiny_female?: any;
  other: Other;
  versions: Versions;
}

interface Versions {
  'generation-i': Generation1;
  'generation-ii': Generation2;
  'generation-iii': Generation3;
  'generation-iv': Generation4;
  'generation-v': Generation5;
  'generation-vi': Generation6;
  'generation-vii': Generation7;
  'generation-viii': Generation8;
}

interface Generation8 {
  icons: Dreamworld;
}

interface Generation7 {
  icons: Dreamworld;
  'ultra-sun-ultra-moon': Omegarubyalphasapphire;
}

interface Generation6 {
  'omegaruby-alphasapphire': Omegarubyalphasapphire;
  'x-y': Omegarubyalphasapphire;
}

interface Omegarubyalphasapphire {
  front_default: string;
  front_female?: any;
  front_shiny: string;
  front_shiny_female?: any;
}

interface Generation5 {
  'black-white': Blackwhite;
}

interface Blackwhite {
  animated: Diamondpearl;
  back_default: string;
  back_female?: any;
  back_shiny: string;
  back_shiny_female?: any;
  front_default: string;
  front_female?: any;
  front_shiny: string;
  front_shiny_female?: any;
}

interface Generation4 {
  'diamond-pearl': Diamondpearl;
  'heartgold-soulsilver': Diamondpearl;
  platinum: Diamondpearl;
}

interface Diamondpearl {
  back_default: string;
  back_female?: any;
  back_shiny: string;
  back_shiny_female?: any;
  front_default: string;
  front_female?: any;
  front_shiny: string;
  front_shiny_female?: any;
}

interface Generation3 {
  emerald: Emerald;
  'firered-leafgreen': Crystal;
  'ruby-sapphire': Crystal;
}

interface Emerald {
  front_default: string;
  front_shiny: string;
}

interface Generation2 {
  crystal: Crystal;
  gold: Crystal;
  silver: Crystal;
}

interface Crystal {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
}

interface Generation1 {
  'red-blue': Redblue;
  yellow: Redblue;
}

interface Redblue {
  back_default: string;
  back_gray: string;
  front_default: string;
  front_gray: string;
}

interface Other {
  dream_world: Dreamworld;
  'official-artwork': OfficialArtwork;
}

export interface OfficialArtwork {
  front_default: string;
}

interface Dreamworld {
  front_default: string;
  front_female?: any;
}

export interface MoveSource {
  move: Source;
  version_group_details: Versiongroupdetail[];
}

interface Versiongroupdetail {
  level_learned_at: number;
  move_learn_method: Source;
  version_group: Source;
}

interface Helditem {
  item: Source;
  version_details: Versiondetail[];
}

interface Versiondetail {
  rarity: number;
  version: Source;
}

interface Gameindex {
  game_index: number;
  version: Source;
}

export interface Ability {
  ability: Source;
  is_hidden: boolean;
  slot: number;
}