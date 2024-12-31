export type ActionType =
  'action' |
  'bonus action' |
  'day' |
  'hour' |
  'instantaneous' |
  'magic action' |
  'minute' |
  'reaction' |
  'round' |
  'special';

export interface ComplexCastingTime {
  actionType: ActionType;
  total: number;
}

export interface ComplexDurationTime {
  actionType: ActionType;
  total: number;
}

export type CastingTime = ComplexCastingTime;

export type Duration = ComplexDurationTime;

export type MagicSchool =
  'abjuration' |
  'conjuration' |
  'divination' |
  'enchantment' |
  'evocation' |
  'illusion' |
  'necromancy' |
  'transmutation' |
  string;

export type SpellComponent =
  'M' |
  'S' |
  'V';

export type System =
  'D&D 2014' |
  'D&D 2024';

export interface DescriptionOrderedListEntity {
  type: 'description-ordered-list-entity',
  items: string[];
}

export interface DescriptionUnorderedListEntity {
  type: 'description-unordered-list-entity',
  items: string[];
}

export type DescriptionEntity =
  DescriptionOrderedListEntity |
  DescriptionUnorderedListEntity |
  string;

export type CreatureSize =
  'tiny' |
  'small' |
  'medium' |
  'large' |
  'huge' |
  'gargantuan';

export type CR =
  '0' |
  '1/8' |
  '1/4' |
  '1/2' |
  '1' |
  '2' |
  '3' |
  '4' |
  '5' |
  '6' |
  '7' |
  '8' |
  '9' |
  '10' |
  '11' |
  '12' |
  '13' |
  '14' |
  '15' |
  '16' |
  '17' |
  '18' |
  '19' |
  '20' |
  '21' |
  '22' |
  '23' |
  '24' |
  '25' |
  '26' |
  '27' |
  '28' |
  '29' |
  '30' |
  string;

export interface CreatureAction {
  id: string;
  name: string;
  description: DescriptionEntity[];
  spellCreatureId: string;
}

export interface CreatureFeature {
  id: string;
  name: string;
  description: DescriptionEntity[];
  spellCreatureId: string;
}

export type Alignment =
  'chaotic evil' |
  'chaotic good' |
  'chaotic neutral' |
  'lawful evil' |
  'lawful good' |
  'lawful neutral' |
  'neutral' |
  'neutral evil' |
  'neutral good' |
  'unaligned'; 

export interface CreatureStatBlock {
  id: string;
  ac: string;
  actions: CreatureAction[];
  alignment: Alignment;
  cha: number;
  con: number;
  conditionImmunities: string;
  cr: CR;
  damageImmunities: string;
  damageResistances: string;
  damageVulnerabilities: string;
  dex: number;
  features: CreatureFeature[];
  hp: string;
  int: number;
  languages: string;
  name: string;
  proficiencyBonus: string;
  senses: string;
  size: CreatureSize;
  speed: string;
  str: number;
  type: string;
  wis: number;
}

export interface Spell {
  id?: string;
  castingTimes: CastingTime[];
  components: SpellComponent[];
  concentration: boolean;
  creatures: CreatureStatBlock[];
  description: DescriptionEntity[];
  descriptionHigherLevel: DescriptionEntity[];
  durationTimes: Duration[];
  level: number;
  magicSchool: MagicSchool;
  materials: string;
  name: string;
  range: string;
  ritual: boolean;
  source: string;
  system: System;
}

export interface Spellbook {
  id: string;
  name: string;
}