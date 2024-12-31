import {
  getSpellLevelString
} from '../../utils/spellStringHelpers';
import {
  MagicSchool,
  Spell
} from '../../types';
import { useState }  from 'react';
import {TrashIcon} from '../Icons';

export interface SpellTableProps {
  onAdd?: (spellId: string) => void;
  onDestroy?: (spellId: string) => void;
  onRemove?: (spellId: string) => void;
  onView?: (spellId: string) => void;
  spells: Spell[];
  spellbookSpellsData?: Spell[];
}

export const SpellTable = ({
  onAdd,
  onDestroy,
  onRemove,
  onView,
  spells,
  spellbookSpellsData
}: SpellTableProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [magicSchool, setMagicSchool] = useState<MagicSchool | ''>('');
  const [cantripFilterOn, setCantripFilterOn] = useState<boolean>(false);
  const [firstFilterOn, setFirstFilterOn] = useState<boolean>(false);
  const [secondFilterOn, setSecondFilterOn] = useState<boolean>(false);
  const [thirdFilterOn, setThirdFilterOn] = useState<boolean>(false);
  const [fourthFilterOn, setFourthFilterOn] = useState<boolean>(false);
  const [fifthFilterOn, setFifthFilterOn] = useState<boolean>(false);
  const [sixthFilterOn, setSixthFilterOn] = useState<boolean>(false);
  const [seventhFilterOn, setSeventhFilterOn] = useState<boolean>(false);
  const [eighthFilterOn, setEighthFilterOn] = useState<boolean>(false);
  const [ninthFilterOn, setNinthFilterOn] = useState<boolean>(false);

  spells.sort((a: Spell, b: Spell) => {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
  });

  let groupedSpells: Spell[] = [];

  if (
    onAdd &&
    onRemove &&
    spellbookSpellsData
  ) {
    let knownSpells: Spell[] = [];
    let unknownSpells: Spell[] = [];

    spells.forEach((spell) => {
      if (spellbookSpellsData.find(spellbookSpell => spellbookSpell.id === spell.id)) {
        knownSpells.push(spell);
      } else {
        unknownSpells.push(spell);
      }
    });

    groupedSpells = [
      ...knownSpells,
      ...unknownSpells
    ]
  } else {
    groupedSpells = spells;
  }

  const filteredSpells = groupedSpells.filter((spell: Spell) => {
    if (
      cantripFilterOn ||
      firstFilterOn ||
      secondFilterOn ||
      thirdFilterOn ||
      fourthFilterOn ||
      fifthFilterOn ||
      sixthFilterOn ||
      seventhFilterOn ||
      eighthFilterOn ||
      ninthFilterOn
    ) {
      if (!cantripFilterOn && spell.level === 0) return false;
      if (!firstFilterOn && spell.level === 1) return false;
      if (!secondFilterOn && spell.level === 2) return false;
      if (!thirdFilterOn && spell.level === 3) return false;
      if (!fourthFilterOn && spell.level === 4) return false;
      if (!fifthFilterOn && spell.level === 5) return false;
      if (!sixthFilterOn && spell.level === 6) return false;
      if (!seventhFilterOn && spell.level === 7) return false;
      if (!eighthFilterOn && spell.level === 8) return false;
      if (!ninthFilterOn && spell.level === 9) return false;
    }

    if (magicSchool) {
      if (spell.magicSchool !== magicSchool) return false;
    }

    if (searchTerm) {
      return spell.name.includes(searchTerm);
    }

    return true;
  });

  return (
    <div>
      <fieldset>
        <label>
          Search
        </label>
        <input
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          type="text"
          value={searchTerm}
        />
      </fieldset>
      <fieldset>
        <label>
          Level
        </label>
        <div style={{ display: 'flex' }}>
          <div style={{ marginRight: '8px' }}>
            <label>Cantrip</label>
            <input
              checked={cantripFilterOn}
              onChange={(e) => {
                setCantripFilterOn(e.target.checked);
              }}
              type="checkbox"
            />
          </div>
          <div style={{ marginRight: '8px' }}>
            <label>1st</label>
            <input
              checked={firstFilterOn}
              onChange={(e) => {
                setFirstFilterOn(e.target.checked);
              }}
              type="checkbox"
            />
          </div>
          <div style={{ marginRight: '8px' }}>
            <label>2nd</label>
            <input
              checked={secondFilterOn}
              onChange={(e) => {
                setSecondFilterOn(e.target.checked);
              }}
              type="checkbox"
            />
          </div>
          <div style={{ marginRight: '8px' }}>
            <label>3rd</label>
            <input
              checked={thirdFilterOn}
              onChange={(e) => {
                setThirdFilterOn(e.target.checked);
              }}
              type="checkbox"
            />
          </div>
          <div style={{ marginRight: '8px' }}>
            <label>4th</label>
            <input
              checked={fourthFilterOn}
              onChange={(e) => {
                setFourthFilterOn(e.target.checked);
              }}
              type="checkbox"
            />
          </div>
          <div style={{ marginRight: '8px' }}>
            <label>5th</label>
            <input
              checked={fifthFilterOn}
              onChange={(e) => {
                setFifthFilterOn(e.target.checked);
              }}
              type="checkbox"
            />
          </div>
          <div style={{ marginRight: '8px' }}>
            <label>6th</label>
            <input
              checked={sixthFilterOn}
              onChange={(e) => {
                setSixthFilterOn(e.target.checked);
              }}
              type="checkbox"
            />
          </div>
          <div style={{ marginRight: '8px' }}>
            <label>7th</label>
            <input
              checked={seventhFilterOn}
              onChange={(e) => {
                setSeventhFilterOn(e.target.checked);
              }}
              type="checkbox"
            />
          </div>
          <div style={{ marginRight: '8px' }}>
            <label>8th</label>
            <input
              checked={eighthFilterOn}
              onChange={(e) => {
                setEighthFilterOn(e.target.checked);
              }}
              type="checkbox"
            />
          </div>
          <div style={{ marginRight: '8px' }}>
            <label>9th</label>
            <input
              checked={ninthFilterOn}
              onChange={(e) => {
                setNinthFilterOn(e.target.checked);
              }}
              type="checkbox"
            />
          </div>
        </div>
      </fieldset>
      <fieldset>
        <label>
          Magic School
        </label>
        <select
          onChange={(e) => {
            setMagicSchool(e.target.value)
          }}
          value={magicSchool}
        >
          <option value=""></option>
          <option value="abjuration">Abjuration</option>
          <option value="conjuration">Conjuration</option>
          <option value="divination">Divination</option>
          <option value="enchantment">Enchantment</option>
          <option value="evocation">Evocation</option>
          <option value="illusion">Illusion</option>
          <option value="necromancy">Necromancy</option>
          <option value="transmutation">Transmutation</option>
        </select>
      </fieldset>
      <table>
        <thead>
          <tr>
            <th>
              Spell
            </th>
            <th>
              School
            </th>
            <th>
              Level
            </th>
            {
              onDestroy ? (
                <th>
                  Actions
                </th>
              ) : null
            }
          </tr>
        </thead>
        <tbody>
          {
            filteredSpells.map((spell: Spell) => {
              return (
                <tr key={spell.id}>
                  <td>
                    {
                      onView ? (
                        <a href="#" onClick={(e) => {
                          e.preventDefault();
                          onView(spell.id!);
                        }}>
                          {spell.name} ({spell.system})
                        </a>
                      ) : (
                        <span>
                          {spell.name} ({spell.system})
                        </span>
                      )
                    }
                  </td>
                  <td>
                    {spell.magicSchool}
                  </td>
                  <td>
                    {getSpellLevelString(spell)}
                  </td>
                  {
                    onDestroy || onAdd || onRemove ? (
                      <td>
                        {
                          onDestroy ? (
                            <td>
                              <button
                                className="icon-button"
                                onClick={() => {
                                  onDestroy(spell.id!);
                                }}
                              >
                                <TrashIcon/>
                              </button>
                            </td>
                          ) : null
                        }
                        {
                          onAdd && onRemove && spellbookSpellsData? (
                            <>
                              {
                                spellbookSpellsData.find((spellbookSpell: Spell) => {
                                  return spellbookSpell.id === spell.id;
                                }) ? (
                                  <button onClick={() => {
                                    onRemove(spell.id!);
                                  }}>
                                    Remove Spell
                                  </button>
                                ) : (
                                  <button onClick={() => {
                                    onAdd(spell.id!);
                                  }}>
                                    Add Spell
                                  </button>
                                )
                              }
                            </>
                          ) : null
                        }
                      </td>
                    ) : null
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
}