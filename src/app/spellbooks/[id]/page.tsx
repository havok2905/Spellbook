'use client';

import { CreateSpellForm } from '@/components/CreateSellForm';
import {
  getSpells,
  getSpellbook,
  getSpellbookSpells,
  addSpellbookSpell,
  removeSpellbookSpell
} from '../../../utils/api';
import { Modal} from '@/components/Modal';
import { Spell } from '../../../types';
import { SpellCard } from '../../../components/SpellCard';
import { SpellDrawer } from '../../../components/SpellDrawer';
import { useParams } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import Link from 'next/link';

export default function Spellbook() {
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [active, setActive] = useState<string>('');
  const [isCreateSpellModalOpen, setIsCreateSpellModalOpen] = useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  const spellbookId = id as string;

  const queryClient = useQueryClient();

  const {
    data: spellbookData,
    isError: spellbookIsError,
    isLoading: spellbookIsLoading
  } = useQuery({
    queryFn: async () => await getSpellbook(spellbookId),
    queryKey: ['spellbookSpells']
  });

  const {
    data: spellsData,
    isError: spellsIsError,
    isLoading: spellsIsLoading,
    refetch: spellsRefetch
  } = useQuery({
    queryFn: async () => await getSpells(),
    queryKey: ['spells']
  });


  const {
    data: spellbookSpellsData,
    isError: spellbookSpellsIsError,
    isLoading: spellbookSpellsIsLoading,
    refetch: spellbookSpellsRefetch
  } = useQuery({
    queryFn: async () => await getSpellbookSpells(spellbookId),
    queryKey: ['spellbook']
  });

  const {
    mutate: addSpellbookSpellMutation
  } = useMutation({
    mutationFn: async ({ id, spellId }: { id: string, spellId: string }) => {
      return await addSpellbookSpell({ id, spellId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['spellbookSpells']
      });

      spellbookSpellsRefetch();
    },
  });

  const {
    mutate: removeSpellbookSpellMutation
  } = useMutation({
    mutationFn: async ({ id, spellId }: { id: string, spellId: string }) => {
      return await removeSpellbookSpell({ id, spellId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['spellbookSpells']
      });

      spellbookSpellsRefetch();
    },
  });

  if (
    spellsIsError ||
    spellbookIsError ||
    spellbookSpellsIsError
  ) {
    return (
      <p>
        Sorry There was an Error.
      </p>
      );
  }

  if (
    spellsIsLoading ||
    spellbookIsLoading ||
    spellbookSpellsIsLoading
  ) {
    return (
      <p>
        Loading...
      </p>
    )
  };

  const filteredSpells = spellbookSpellsData.filter((spell: Spell) => {
    if (!searchTerm) return true;
    return spell.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());
  });

  filteredSpells.sort((a: Spell, b: Spell) => {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
  });

  spellsData.sort((a: Spell, b: Spell) => {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
  });

  const spellPartition: Spell[][] = [
    [], // Cantrip
    [], // 1st
    [], // 2nd
    [], // 3rd
    [], // 4th
    [], // 5th
    [], // 6th
    [], // 7th
    [], // 8th
    []  // 9th
  ];

  filteredSpells.forEach((spell: Spell) => {
    spellPartition[spell.level].push(spell);
  });

  const getSpellLevelString = (level: number): string => {
    if (level === 0) return 'cantrip';
    if (level === 1) return '1st level';
    if (level === 2) return '2nd level';
    if (level === 3) return '3rd level';
    return `${level}th level`;
  };

  return (
    <>
      <div className="container">
        <div style={{
          width: '940px'
        }}>
          <div style={{
            marginTop: '8px'
          }}>
            <Link href="/">
              Home
            </Link>
          </div>
          <h1>
            Spellbook - {spellbookData.name}
          </h1>
          <div style={{
            marginBottom: '20px'
          }}>
            <button onClick={() => {
              setIsAddModalOpen(true);
            }}>
              Manage Spells
            </button>
            <button onClick={() => {
              setIsCreateSpellModalOpen(true);
            }}>
              Create & Add Spell
            </button>
          </div>
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
          {
            spellPartition.map((partition, index) => {
              if (!partition.length) {
                return null;
              }

              return (
                <div key={index}>
                  <h2>
                    {getSpellLevelString(index)}
                  </h2>
                  <div className="spell-card-list">
                    {
                      partition.map((spell) => {
                        const onClick = () => {
                          if (active === spell.id) {
                            setActive('');
                          } else {
                            setActive(spell.id);
                          }
                        };
            
                        return (
                          <SpellCard
                            active={spell.id === active}
                            key={spell.id}
                            onClick={onClick}
                            spell={spell}
                          />
                        )
                      })
                    }
                  </div>
                </div>
              );
            })
          }
        </div>
        <SpellDrawer
          spell={spellbookSpellsData.find((s: Spell) => s.id === active)}
        />
      </div>
      <Modal
        isOpen={isCreateSpellModalOpen}
        onClose={() => {
          setIsCreateSpellModalOpen(false);
        }}
        portalElement={document.body}
      >
        <CreateSpellForm onSubmitSuccess={(spellId: string) => {
          spellsRefetch();
          setIsCreateSpellModalOpen(false);
          addSpellbookSpellMutation({
            id: spellbookData.id,
            spellId
          })
        }}/>
      </Modal>
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
        }}
        portalElement={document.body}
      >
        <table>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Source</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              spellsData.map((spell: Spell) => {
                return (
                  <tr key={spell.id}>
                    <td>
                      {spell.name}
                    </td>
                    <td>
                      {spell.system}
                    </td>
                    <td>
                      {
                        spellbookSpellsData.find((spellbookSpell: Spell) => {
                          return spellbookSpell.id === spell.id;
                        }) ? (
                          <button onClick={() => {
                            if (active === spell.id) {
                              setActive('');
                            }

                            removeSpellbookSpellMutation({
                              id: spellbookData.id,
                              spellId: spell.id
                            })
                          }}>
                            Remove Spell
                          </button>
                        ) : (
                          <button onClick={() => {
                            addSpellbookSpellMutation({
                              id: spellbookData.id as string,
                              spellId: spell.id
                            });
                          }}>
                            Add Spell
                          </button>
                        )
                      }
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </Modal>
    </>
  );
};
