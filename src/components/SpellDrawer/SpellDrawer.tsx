import { Spell } from '../../types';
import { SpellDisplay } from '../SpellDisplay/SpellDisplay';
import styles from './SpellDrawer.module.css';

export interface SpellDrawerProps {
  spell?: Spell;
}

export const SpellDrawer = ({
  spell
}: SpellDrawerProps) => {

  return (
    <div className={styles.SpellDrawer}>
      <SpellDisplay spell={spell}/>
    </div>
  )
};