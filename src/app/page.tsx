'use client';

import { CreateSpellForm } from '@/components/CreateSellForm';
import { CreateSpellbookForm } from '@/components/CreateSpellbookForm';
import {
  destroySpell,
  destroySpellbook,
  getSpellbooks,
  getSpells
} from '../utils/api';
import Link from 'next/link';
import { Modal } from '../components/Modal';
import {
  Spell,
  Spellbook
} from '../types';
import { SpellDisplay } from '@/components/SpellDisplay/SpellDisplay';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState }  from 'react';

export default function Spellbooks() {
  const [activeSpell, setActiveSpell] = useState<string>('');
  const [isCreateSpellModalOpen, setIsCreateSpellModalOpen] = useState<boolean>(false);
  const [isCreateSpellbookModalOpen, setIsCreateSpellbookModalOpen] = useState<boolean>(false);
  const [isViewSpellModalOpen, setIsViewSpellModalOpen] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const {
    data: spellbooksData,
    isError: spellbooksIsError,
    isLoading: spellbooksIsLoading,
    refetch: spellbooksRefresh
  } = useQuery({
    queryFn: async () => await getSpellbooks(),
    queryKey: ['spellbooks']
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
    mutate: destroySpellMutation
  } = useMutation({
    mutationFn: async (id: string) => {
      return await destroySpell({ id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['spells']
      });

      spellsRefetch();
    },
  });

  const {
    mutate: destroySpellbookMutation
  } = useMutation({
    mutationFn: async (id: string) => {
      return await destroySpellbook({ id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['spellbooks']
      });

      spellbooksRefresh();
    },
  });

  if (
    spellbooksIsError ||
    spellsIsError
  ) {
    return (
      <p>
        Sorry There was an Error.
      </p>
    );
  }

  if (
    spellbooksIsLoading ||
    spellsIsLoading
  ) {
    return (
      <p>
        Loading...
      </p>
    )
  };

  const handleOnDestoryClick = (spellId: string) => {
    destroySpellMutation(spellId);
  };

  const handleOnViewClick = (spellId: string) => {
    setIsViewSpellModalOpen(true);
    setActiveSpell(spellId);
  };

  spellsData.sort((a: Spell, b: Spell) => {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
  });

  return (
    <>
      <div className="container">
        <h1>
          Spellbinder
        </h1>
      </div>
      <div className="container">
        <div style={{
          width: '620px'
        }}>
          <h2>Spellbooks</h2>
          <div>
          <button onClick={() => {
              setIsCreateSpellbookModalOpen(true);
            }}>
              Create Spellbook
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>
                  Spellbook
                </th>
                <th>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {
                spellbooksData.map((spellbook: Spellbook) => {
                  return (
                    <tr key={spellbook.id}>
                      <td>
                        {spellbook.name}
                      </td>
                      <td>
                        <Link href={`/spellbooks/${spellbook.id}`}>
                          View
                        </Link>
                        <button onClick={() => {
                          destroySpellbookMutation(spellbook.id);
                        }}>
                          Destroy
                        </button>
                      </td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
        <div style={{
          width: '620px'
        }}>
          <h2>Spells</h2>
          <div>
            <button onClick={() => {
              setIsCreateSpellModalOpen(true);
            }}>
              Create Spell
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>
                  Spell
                </th>
                <th>
                  Actions
                </th>
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
                        <button onClick={() => {
                          handleOnViewClick(spell.id);
                        }}>
                          View
                        </button>
                        <button onClick={() => {
                          handleOnDestoryClick(spell.id);
                        }}>
                          Destroy
                        </button>
                      </td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        isOpen={isViewSpellModalOpen}
        onClose={() => {
          setIsViewSpellModalOpen(false);
          setActiveSpell('');
        }}
        portalElement={document.body}
      >
        {
          activeSpell ? (
            <SpellDisplay
              spell={spellsData.find((spell: Spell) => spell.id === activeSpell)}
            />
          ) : null
        }
      </Modal>
      <Modal
        isOpen={isCreateSpellModalOpen}
        onClose={() => {
          setIsCreateSpellModalOpen(false);
        }}
        portalElement={document.body}
      >
        <CreateSpellForm onSubmitSuccess={() => {
          spellsRefetch();
          setIsCreateSpellModalOpen(false);
        }}/>
      </Modal>
      <Modal
        isOpen={isCreateSpellbookModalOpen}
        onClose={() => {
          setIsCreateSpellbookModalOpen(false);
        }}
        portalElement={document.body}
      >
        <CreateSpellbookForm onSubmitSuccess={() => {
          spellbooksRefresh();
          setIsCreateSpellbookModalOpen(false);
        }}/>
      </Modal>
    </>
  )
}