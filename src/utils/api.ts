export const getSpells = async () => {
  const response = fetch(
    'http://localhost:4000/spells/',
    {
      method: "GET",
      headers: {
        accept: "application/json"
      }
    }
  )
    .then((response) => {
      if(response.ok) {
        return response.json();
      }
    })
    .catch((err) => console.error(err));

  return response;
};

export interface CreateSpellbookArgs {
  name: string;
}

export const createSpellbook = async ({
  name
}: {
  name: string
}) => {
  const response = fetch(
    'http://localhost:4000/spellbooks/',
    {
      method: "POST",
      headers: {
        accept: "application/json",
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        name
      }),
    }
  )
    .then((response) => {
      if(response.ok) {
        return response.json();
      }
    })
    .catch((err) => console.error(err));

  return response;
};

export const destroySpellbook = async ({
  id
}: {
  id: string
}) => {
  const response = fetch(
    `http://localhost:4000/spellbooks/${id}`,
    {
      method: "DELETE",
      headers: {
        accept: "application/json"
      }
    }
  )
    .then((response) => {
      if(response.ok) {
        return response.json();
      }
    })
    .catch((err) => console.error(err));

  return response;
};

export const getSpellbook = async (spellbookId: string) => {
  const response = fetch(
    `http://localhost:4000/spellbooks/${spellbookId}`,
    {
      method: "GET",
      headers: {
        accept: "application/json"
      }
    }
  )
    .then((response) => {
      if(response.ok) {
        return response.json();
      }
    })
    .catch((err) => console.error(err));

  return response;
};

export const getSpellbooks = async () => {
  const response = fetch(
    'http://localhost:4000/spellbooks',
    {
      method: "GET",
      headers: {
        accept: "application/json"
      }
    }
  )
    .then((response) => {
      if(response.ok) {
        return response.json();
      }
    })
    .catch((err) => console.error(err));

  return response;
};

export const getSpellbookSpells = async (spellbookId: string) => {
  const response = fetch(
    `http://localhost:4000/spellbooks/${spellbookId}/spells`,
    {
      method: "GET",
      headers: {
        accept: "application/json"
      }
    }
  )
    .then((response) => {
      if(response.ok) {
        return response.json();
      }
    })
    .catch((err) => console.error(err));

  return response;
};
