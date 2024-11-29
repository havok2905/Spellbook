import {
  CastingTime,
  DescriptionEntity,
  Duration,
  MagicSchool,
  SpellComponent,
  System
} from '@/types';
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm
} from "react-hook-form";
import { createSpell } from '@/utils/api';
import { DescriptionField } from '../EntityDescriptionField/EntityDescriptionField';
import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query';

type Inputs = {
  castingTime: CastingTime[];
  components: SpellComponent[];
  concentration: boolean;
  description: DescriptionEntity[];
  descriptionHigherLevel: DescriptionEntity[];
  duration: Duration[];
  level: number;
  materials: string;
  magicSchool: MagicSchool;
  name: string;
  range: string;
  ritual: boolean;
  source: string;
  system: System;
};

export interface CreateSpellFormProps {
  onSubmitSuccess: (spellId: string) => void;
}

export const CreateSpellForm = ({
  onSubmitSuccess
}: CreateSpellFormProps) => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: {
      errors
    }
  } = useForm<Inputs>();

  const {
    fields: castingTimeFields,
    append: castingTimeAppend,
    remove: castingTimeRemove
  } = useFieldArray({
    control,
    name: "castingTime"
  });

  const {
    fields: durationFields,
    append: durationAppend,
    remove: durationRemove
  } = useFieldArray({
    control,
    name: "duration"
  });

  const {
    fields: descriptionFields,
    append: descriptionAppend,
    remove: descriptionRemove,
  } = useFieldArray({
    control,
    name: "description"
  });

  const {
    fields: descriptionHigherLevelFields,
    append: descriptionHigherLevelAppend,
    remove: descriptionHigherLevelRemove,
  } = useFieldArray({
    control,
    name: "descriptionHigherLevel"
  });

  const queryClient = useQueryClient();

  const {
    mutate: createSpellMutation
  } = useMutation({
    mutationFn: async (data: any) => {
      return await createSpell(data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['spells']
      });

      onSubmitSuccess(data.id);
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    createSpellMutation(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <label>
          Name
        </label>
        <input {...register('name', { required: true })} type="text"/>
      </fieldset>
      <fieldset>
        <label>
          Level
        </label>
        <select {...register('level', { required: true, valueAsNumber: true, })}>
          <option value={0}>Cantrip</option>
          <option value={1}>1st</option>
          <option value={2}>2nd</option>
          <option value={3}>3rd</option>
          <option value={4}>4th</option>
          <option value={5}>5th</option>
          <option value={6}>6th</option>
          <option value={7}>7th</option>
          <option value={8}>8th</option>
          <option value={9}>9th</option>
        </select>
      </fieldset>
      <fieldset>
        <label>
          Magic School
        </label>
        <select {...register('magicSchool', { required: true })}>
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
      <fieldset>
        <label>
          Components
        </label>
        <select {...register('components', { required: true })} multiple>
          <option value="M">Material</option>
          <option value="S">Somatic</option>
          <option value="V">Verbal</option>
        </select>
      </fieldset>
      <fieldset>
        <label>
          Ritual
        </label>
        <input {...register('ritual')} type="checkbox"/>
      </fieldset>
      <fieldset>
        <label>
          Concentration
        </label>
        <input {...register('concentration')} type="checkbox"/>
      </fieldset>
      <fieldset>
        <label>
          Materials
        </label>
        <input {...register('materials')} type="text"/>
      </fieldset>
      <fieldset>
        <label>
          Range
        </label>
        <input {...register('range', { required: true })} type="text"/>
      </fieldset>
      <fieldset>
        <h3>Duration</h3>
        <button onClick={() => {
          durationAppend({
            actionType: 'action',
            total: 1
          });
        }} type="button">
          Add Duration
        </button>
        {durationFields.map((field, index) => (
          <>
            <label>
              Action Type
            </label>
            <select {...register(`duration.${index}.actionType`, { required: true })}>
              <option value="action">Action</option>
              <option value="bonus action">Bonus Action</option>
              <option value="hour">Hour</option>
              <option value="instantaneous">Instantaneous</option>
              <option value="magic action">Magic Action</option>
              <option value="minute">Minute</option>
              <option value="reaction">Reaction</option>
            </select>
            <label>
              Total
            </label>
            <input
              key={field.id} // important to include key with field's id
              {...register(`duration.${index}.total`, { valueAsNumber: true })}
              type="number"
            />
            <button onClick={() => {
              durationRemove(index)
            }} type="button">
              Remove
            </button>
          </>
        ))}
      </fieldset>
      <fieldset>
        <h3>Casting Time</h3>
        <button onClick={() => {
          castingTimeAppend({
            actionType: 'action',
            total: 1
          });
        }} type="button">
          Add Casting Time
        </button>
        {castingTimeFields.map((field, index) => (
          <>
            <label>
              Action Type
            </label>
            <select {...register(`castingTime.${index}.actionType`, { required: true })}>
              <option value="action">Action</option>
              <option value="bonus action">Bonus Action</option>
              <option value="hour">Hour</option>
              <option value="instantaneous">Instantaneous</option>
              <option value="magic action">Magic Action</option>
              <option value="minute">Minute</option>
              <option value="reaction">Reaction</option>
            </select>
            <label>
              Total
            </label>
            <input
              key={field.id} // important to include key with field's id
              {...register(`castingTime.${index}.total`, { valueAsNumber: true })}
              type="number"
            />
            <button onClick={() => {
              castingTimeRemove(index)
            }} type="button">
              Remove
            </button>
          </>
        ))}
      </fieldset>
      <fieldset>
        <h3>Description</h3>
        <button type="button" onClick={() => {
          descriptionAppend({
            type: 'description-ordered-list-entity',
            items: []
          })
        }}>
          Add Description
        </button>
        {
          descriptionFields.map((field, index) => {
            return (
              <div key={field.id}>
                <Controller
                  control={control}
                  name={`description.${index}`}
                  render={() => {
                    return (
                      <>
                        <DescriptionField
                          fieldString={`description.${index}`}
                          setValue={setValue}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            descriptionRemove(index);
                          }}
                        >
                          Remove
                        </button>
                      </>
                    )
                  }}
                />
              </div>
            );
          })
        }
      </fieldset>
      <fieldset>
        <h3>Description at Higher Levels</h3>
        <button type="button" onClick={() => {
          descriptionHigherLevelAppend({
            type: 'description-ordered-list-entity',
            items: []
          })
        }}>
          Add Description
        </button>
        {
          descriptionHigherLevelFields.map((field, index) => {
            return (
              <div key={field.id}>
                <Controller
                  control={control}
                  name={`descriptionHigherLevel.${index}`}
                  render={() => {
                    return (
                      <>
                        <DescriptionField
                          fieldString={`descriptionHigherLevel.${index}`}
                          setValue={setValue}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            descriptionHigherLevelRemove(index);
                          }}
                        >
                          Remove
                        </button>
                      </>
                    )
                  }}
                />
              </div>
            );
          })
        }
      </fieldset>
      <fieldset>
        <h3>Creatures</h3>
        <button type="button">
          Add Creature
        </button>
      </fieldset>
      <fieldset>
        <label>
          Source
        </label>
        <input {...register('source', { required: true })} type="text"/>
      </fieldset>
      <fieldset>
        <label>
          System
        </label>
        <select {...register('system', { required: true })}>
          <option value="D&D 2014">D&D 2014</option>
          <option value="D&D 2024">D&D 2024</option>
        </select>
      </fieldset>
      <fieldset>
        <button type="submit">
          Create
        </button>
      </fieldset>
    </form>
  );
};