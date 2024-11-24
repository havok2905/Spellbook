'use client';

import { CreateSpellbookForm } from '@/components/CreateSpellbookForm';
import {
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
import { useQuery } from '@tanstack/react-query';
import { useState}  from 'react';

export default function Spellbooks() {
  const [activeSpell, setActiveSpell] = useState<string>('');
  const [isCreateSpellModalOpen, setIsCreateSpellModalOpen] = useState<boolean>(false);
  const [isCreateSpellbookModalOpen, setIsCreateSpellbookModalOpen] = useState<boolean>(false);
  const [isViewSpellModalOpen, setIsViewSpellModalOpen] = useState<boolean>(false);


  const {
    data: spellbooksData,
    isError: spellbooksIsError,
    isLoading: spellbooksIsLoading
  } = useQuery({
    queryFn: async () => await getSpellbooks(),
    queryKey: ['spellbooks']
  });

  const {
    data: spellsData,
    isError: spellsIsError,
    isLoading: spellsIsLoading
  } = useQuery({
    queryFn: async () => await getSpells(),
    queryKey: ['spells']
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

  const handleOnViewClick = (spellId: string) => {
    setIsViewSpellModalOpen(true);
    setActiveSpell(spellId);
  };

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
                        <button>Destroy</button>
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
                        <button>Destroy</button>
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
        <p>
          Create Spell
        </p>
      </Modal>
      <Modal
        isOpen={isCreateSpellbookModalOpen}
        onClose={() => {
          setIsCreateSpellbookModalOpen(false);
        }}
        portalElement={document.body}
      >
        <CreateSpellbookForm/>
      </Modal>
    </>
  )
}