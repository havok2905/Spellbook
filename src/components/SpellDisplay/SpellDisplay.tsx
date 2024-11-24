import { EntityDescription } from '../EntityDescription';
import {
  getCastingTimes,
  getDurations,
  getSpellLevelString
} from '../../utils/spellStringHelpers';
import { Spell } from '../../types';
import { StatBlock } from '../StatBlock';

import styles from './SpellDisplay.module.css';

export interface SpellDisplayProps {
  spell?: Spell;
}

export const SpellDisplay = ({
  spell
}: SpellDisplayProps) => {
  if (!spell) return null;

  const spellLevelString = getSpellLevelString(spell);

  console.log({ spell });

  return (
    <>
      <h2>
        {spell.name}
      </h2>
      <p className={styles.SpellDrawerSubTitle}>
        {spellLevelString} {spell.magicSchool}
      </p>
      <p>
        <strong>Casting Time:</strong> {getCastingTimes(spell.castingTimes)}
      </p>
      <p>
        <strong>Duration:</strong> {getDurations(spell.durationTimes)}
      </p>
      <p>
        <strong>Components:</strong> {spell.components.join('')}
      </p>
      <p>
        <strong>Ritual:</strong> {spell.ritual ? 'Yes' : 'No'}
      </p>
      <p>
        <strong>Concentration:</strong> {spell.concentration ? 'Yes' : 'No'}
      </p>
      <p>
        <strong>Range:</strong> {spell.range}
      </p>
      <h3>
        Description
      </h3>
      <EntityDescription
        entityDescription={spell.description}
      />
      {
        spell.descriptionHigherLevel.length ? (
          <div>
            <h3>
              At Higher Levels
            </h3>
            <EntityDescription
              entityDescription={spell.descriptionHigherLevel}
            />
          </div>
        ) : null
      }
      {
        spell.creatures.length ? (
          <>
            <h3>
              Stat Blocks
            </h3>
            {
              spell.creatures.map((c, index) => {
                return (
                  <StatBlock
                    key={index}
                    statBlock={c}
                  />
                )
              })
            }
          </>
        ) : null
      }
      <hr/>
      <p>
        System: {spell.system}
      </p>
      <p>
        Source: {spell.source}
      </p>
    </>
  );
};