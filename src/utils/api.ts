import {CastingTime, DescriptionEntity, Duration, MagicSchool, System} from '@/types';

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

export const addSpellbookSpell = async ({
  id,
  spellId
}: {
  id: string,
  spellId: string
}) => {
  const response = fetch(
    `http://localhost:4000/spellbooks/${id}/addSpell/${spellId}`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
        'Content-type': 'application/json; charset=UTF-8',
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

export const removeSpellbookSpell = async ({
  id,
  spellId
}: {
  id: string,
  spellId: string
}) => {
  const response = fetch(
    `http://localhost:4000/spellbooks/${id}/removeSpell/${spellId}`,
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

export const createSpell = async ({
  castingTime,
  components,
  concentration,
  description,
  descriptionHigherLevel,
  duration,
  level,
  magicSchool,
  materials,
  name,
  range,
  ritual,
  source,
  system
}: {
  castingTime: CastingTime[],
  components: string,
  concentration: boolean,
  description: DescriptionEntity[],
  descriptionHigherLevel: DescriptionEntity[],
  duration: Duration[],
  level: number,
  magicSchool: MagicSchool,
  materials: string,
  name: string,
  range: string,
  ritual: boolean,
  source: string,
  system: System
}) => {
  const body = JSON.stringify({
    castingTimes: castingTime,
    components,
    concentration,
    description,
    descriptionHigherLevel,
    durationTimes: duration,
    level,
    magicSchool,
    materials,
    name,
    range,
    ritual,
    source,
    system
  });

  console.log({ body });

  const response = fetch(
    'http://localhost:4000/spells/',
    {
      method: "POST",
      headers: {
        accept: "application/json",
        'Content-type': 'application/json; charset=UTF-8',
      },
      body
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

export const destroySpell = async ({
  id
}: {
  id: string
}) => {
  const response = fetch(
    `http://localhost:4000/spells/${id}`,
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
