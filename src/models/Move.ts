import { Source } from './APIResponse';
import { MachineSource } from './Machine';
import { Name } from './PokemonSpecies';

export interface Move {
  accuracy: number;
  contest_combos: ContestCombosSet;
  contest_effect: {
    url: string;
  };
  contest_type: Source;
  damage_class: Source;
  effect_chance?: any;
  effect_changes: any[];
  effect_entries: EffectEntry[];
  flavor_text_entries: FlavorTextEntry[];
  generation: Source;
  id: number;
  learned_by_pokemon: Source[];
  machines: MachineSource[];
  meta: Meta;
  name: string;
  names: Name[];
  past_values: any[];
  power: number;
  pp: number;
  priority: number;
  stat_changes: any[];
  super_contest_effect: {
    url: string;
  };
  target: Source;
  type: Source;
}

interface Meta {
  ailment: Source;
  ailment_chance: number;
  category: Source;
  crit_rate: number;
  drain: number;
  flinch_chance: number;
  healing: number;
  max_hits?: any;
  max_turns?: any;
  min_hits?: any;
  min_turns?: any;
  stat_chance: number;
}

interface FlavorTextEntry {
  flavor_text: string;
  language: Source;
  version_group: Source;
}

interface EffectEntry {
  effect: string;
  language: Source;
  short_effect: string;
}

interface ContestCombosSet {
  normal: ContestComboDetail;
  super: ContestComboDetail;
}

interface ContestComboDetail {
  use_after?: Move[];
  use_before?: Move[];
}