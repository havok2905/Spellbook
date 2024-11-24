import { DescriptionEntity } from '../../types';

export interface EntityDescriptionProps {
  entityDescription: DescriptionEntity[];
}

export const EntityDescription = ({
  entityDescription
}: EntityDescriptionProps) => {
  return entityDescription.map((entity, index) => {
    if (typeof entity === 'string') {
      return (
        <p key={index}>
          {entity}
        </p>
      );
    }

    if (entity.type === 'description-unordered-list-entity') {
      return (
        <ul key={index}>
          {
            entity.items.map((i, index) => {
              return (
                <li key={index}>
                  {i}
                </li>
              );
            })
          }
        </ul>
      );
    }

    if (entity.type === 'description-ordered-list-entity') {
      return (
        <ol key={index}>
          {
            entity.items.map((i, index) => {
              return (
                <li key={index}>
                  {i}
                </li>
              );
            })
          }
        </ol>
      );
    }

    return null;
  });
}