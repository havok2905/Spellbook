export const getSpells = async () => {
  const response = fetch(
    'http://localhost:3001/spells/',
    {
      method: "GET",
      headers: {
        accept: "application/json"
      }
    }
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));

  return response;
};

export const getSpellbook = async (spellbookId: string) => {
  const response = fetch(
    `http://localhost:3001/spellbooks/${spellbookId}`,
    {
      method: "GET",
      headers: {
        accept: "application/json"
      }
    }
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));

  return response;
};

export const getSpellbooks = async () => {
  const response = fetch(
    'http://localhost:3001/spellbooks',
    {
      method: "GET",
      headers: {
        accept: "application/json"
      }
    }
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));

  return response;
};

export const getSpellbookSpells = async (spellbookId: string) => {
  const response = fetch(
    `http://localhost:3001/spellbooks/${spellbookId}/spells`,
    {
      method: "GET",
      headers: {
        accept: "application/json"
      }
    }
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));

  return response;
};
