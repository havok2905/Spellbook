import classNames from 'classnames';
import {
  getCastingTimes,
  getDurations,
  getComponentsString,
  getSpellLevelString
} from '../../utils/spellStringHelpers';
import { Spell } from '../../types';

import styles from './SpellCard.module.css';

export interface SpellCardProps {
  active?: boolean;
  onClick?: () => void;
  spell: Spell;
}

export const SpellCard = ({
  active = false,
  onClick,
  spell
}: SpellCardProps) => {
  const componentsString = getComponentsString(spell);
  const spellLevelString = getSpellLevelString(spell);

  const internalOnClick = () => {
    if (onClick) {
      onClick();
    }
  }

  const classList = {
    [styles.SpellCard]: true,
    [styles.SpellCardActiveAbjuration]: active && spell.magicSchool === 'abjuration',
    [styles.SpellCardActiveConjuration]: active && spell.magicSchool === 'conjuration',
    [styles.SpellCardActiveDivination]: active && spell.magicSchool === 'divination',
    [styles.SpellCardActiveEnchantment]: active && spell.magicSchool === 'enchantment',
    [styles.SpellCardActiveEvocation]: active && spell.magicSchool === 'evocation',
    [styles.SpellCardActiveIllusion]: active && spell.magicSchool === 'illusion',
    [styles.SpellCardActiveNecromancy]: active && spell.magicSchool === 'necromancy',
    [styles.SpellCardActiveTransmutation]: active && spell.magicSchool === 'transmutation'
  };

  const titleClassList = {
    [styles.SpellCardTitle]: true,
    [styles.SpellCardTitleAbjuration]: spell.magicSchool === 'abjuration',
    [styles.SpellCardTitleConjuration]: spell.magicSchool === 'conjuration',
    [styles.SpellCardTitleDivination]: spell.magicSchool === 'divination',
    [styles.SpellCardTitleEnchantment]: spell.magicSchool === 'enchantment',
    [styles.SpellCardTitleEvocation]: spell.magicSchool === 'evocation',
    [styles.SpellCardTitleIllusion]: spell.magicSchool === 'illusion',
    [styles.SpellCardTitleNecromancy]: spell.magicSchool === 'necromancy',
    [styles.SpellCardTitleTransmutation]: spell.magicSchool === 'transmutation'
  };

  return (
    <div
      className={classNames(classList)}
      onClick={internalOnClick}>
      <div>
        <h3 className={classNames(titleClassList)}>
          {spell.name}
        </h3>
        <p className={styles.SpellCardSubTitle}>
          {spellLevelString} {spell.magicSchool}
        </p>
      </div>
      <div>
        <p>
          Casting Time: {getCastingTimes(spell.castingTimes)}
        </p>
        <p>
          Duration: {getDurations(spell.durationTimes)}
        </p>
        <p>
          Range: {spell.range}
        </p>
        <p>
          {componentsString}
        </p>
      </div>
      <p className={styles.SpellCardSystem}>
        {spell.system}
      </p>
    </div>
  );
};