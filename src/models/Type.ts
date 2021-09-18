import { Source } from './APIResponse';

export interface Type {
  damage_relations: DamageRelation;
  game_indices: GameIndex[];
  generation: Source;
  id: number;
  move_damage_class: Source;
  moves: Source[];
  name: string;
  names: Name[];
  past_damage_relations: PostDamageRelation[];
  pokemon: Pokemon[];
}

interface Pokemon {
  pokemon: Source;
  slot: number;
}

interface PostDamageRelation {
  damage_relations: DamageRelation;
  generation: Source;
}

interface Name {
  language: Source;
  name: string;
}

interface GameIndex {
  game_index: number;
  generation: Source;
}

interface DamageRelation {
  double_damage_from: Source[];
  double_damage_to: Source[];
  half_damage_from: Source[];
  half_damage_to: Source[];
  no_damage_from: any[];
  no_damage_to: any[];
}