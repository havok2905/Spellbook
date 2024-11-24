import {
  CastingTime,
  Duration,
  Spell
} from '../types';

export const getCastingTime = (castingTime: CastingTime): string => {
  if (typeof castingTime === 'string') {
    return castingTime;
  }

  return `${castingTime.total} ${castingTime.actionType}`;
};

export const getCastingTimes = (castingTimes: CastingTime[]): string => {
  return castingTimes.map(getCastingTime).join(' or ');
};

export const getDuration = (duration: Duration): string => {
  if (typeof duration === 'string') {
    return duration;
  }

  return `${duration.total} ${duration.actionType}`;
};

export const getDurations = (durations: Duration[]): string => {
  return durations.map(getDuration).join(' or ');
};

export const getComponentsString = (spell: Spell): string => {
  let componentsString = spell.components.join('');

  if (spell.ritual) {
    componentsString += 'R';
  }

  if (spell.concentration) {
    componentsString += 'C';
  }

  return componentsString;
};

export const getSpellLevelString = (spell: Spell): string => {
  if (spell.level === 0) return 'cantrip';
  if (spell.level === 1) return '1st level';
  if (spell.level === 2) return '2nd level';
  if (spell.level === 3) return '3rd level';
  return `${spell.level}th level`;
};