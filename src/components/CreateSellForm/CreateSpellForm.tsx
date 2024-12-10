import {
  CastingTime,
  CreatureStatBlock,
  DescriptionEntity,
  Duration,
  MagicSchool,
  SpellComponent,
  System
} from '@/types';
import {
  Control,
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
  UseFormRegister
} from "react-hook-form";
import { createSpell } from '@/utils/api';
import { DescriptionField } from '../EntityDescriptionField';
import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query';

type Inputs = {
  castingTime: CastingTime[];
  components: SpellComponent[];
  concentration: boolean;
  creatures: CreatureStatBlock[];
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

const CreatureDescriptionField = ({
  control,
  parentIndex,
  entityIndex,
  setValue,
  type
}: {
  control: Control<Inputs>;
  parentIndex: number;
  entityIndex: number;
  setValue: any;
  type: 'features' | 'actions'
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `creatures.${parentIndex}.${type}.${entityIndex}.description`
  });

  return (
    <div>
      <button type="button" onClick={() => {
        append({
          type: 'description-ordered-list-entity',
          items: []
        })
      }}>
        Add Description
      </button>
      {
        fields.map((field, index) => {
          return (
            <div key={field.id}>
              <DescriptionField
                fieldString={`creatures.${parentIndex}.${type}.${entityIndex}.description.${index}`}
                setValue={setValue}
              />
              <button
                type="button"
                onClick={() => {
                  remove(index);
                }}
              >
                Remove
              </button>
            </div>
          );
        })
      }
    </div>
  );
};

const CreatureEntityField = ({
  control,
  register,
  parentIndex,
  setValue,
  type
}: {
  control: Control<Inputs>;
  register: UseFormRegister<Inputs>;
  parentIndex: number;
  setValue: any;
  type: 'features' | 'actions'
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `creatures.${parentIndex}.${type}`
  });

  return (
    <fieldset>
      <button
        type="button"
        onClick={() =>
          append({
            id: '',
            spellCreatureId: '',
            name: '',
            description: [] as DescriptionEntity[]
          })
        }
      >
        Add Feature
      </button>
      {fields.map((field, index) => (
        <div key={field.id}>
          <fieldset>
            <label>Name</label>
            <input type="text" {...register(`creatures.${parentIndex}.${type}.${index}.name`)} />
          </fieldset>
          <CreatureDescriptionField
            control={control}
            parentIndex={parentIndex}
            entityIndex={index}
            setValue={setValue}
            type={type}
          />
          <button type="button" onClick={() => remove(index)}>
            Remove
          </button>
        </div>
      ))}
    </fieldset>
  );
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
    fields: creatureFields,
    append: creatureAppend,
    remove: creatureRemove
  } = useFieldArray({
    control,
    name: "creatures"
  });

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
    <div>
      <h2>
        Create Spell
      </h2>
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
                <option value="day">Day</option>
                <option value="hour">Hour</option>
                <option value="instantaneous">Instantaneous</option>
                <option value="magic action">Magic Action</option>
                <option value="minute">Minute</option>
                <option value="reaction">Reaction</option>
                <option value="round">Round</option>
                <option value="special">Special</option>
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
                <option value="day">Day</option>
                <option value="hour">Hour</option>
                <option value="instantaneous">Instantaneous</option>
                <option value="magic action">Magic Action</option>
                <option value="minute">Minute</option>
                <option value="reaction">Reaction</option>
                <option value="round">Round</option>
                <option value="special">Special</option>
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
          <button onClick={() => {
            creatureAppend({
              id: '',
              ac: '',
              actions: [],
              alignment: 'chaotic good',
              cha: 10,
              con: 10,
              conditionImmunities: '',
              cr: '0',
              damageImmunities: '',
              damageResistances: '',
              damageVulnerabilities: '',
              dex: 10,
              features: [],
              hp: '',
              int: 10,
              languages: '',
              name: '',
              proficiencyBonus: '',
              senses: '',
              size: 'medium',
              speed: '',
              str: 10,
              type: '',
              wis: 10
            });
          }} type="button">
            Add Creature
          </button>
          {
            creatureFields.map((field, index) => {
              return (
                <div key={field.id}>
                  <div>
                    <fieldset>
                      <label>Name</label>
                      <input type="text" {...register(`creatures.${index}.name`, { required: true })}/>
                    </fieldset>
                    <fieldset>
                      <label>Alignment</label>
                      <select {...register(`creatures.${index}.alignment`, { required: true })}>
                        <option value="chaotic evil">Chaotic Evil</option>
                        <option value="chaotic good">Chaotic Good</option>
                        <option value="chaotic neutral">Chaotic Neutral</option>
                        <option value="lawful evil">Lawful Evil</option>
                        <option value="lawful good">Lawful Good</option>
                        <option value="lawful neutral">Lawful Neutral</option>
                        <option value="neutral">Neutral</option>
                        <option value="neutral evil">Neutral Evil</option>
                        <option value="neutral good">Neutral Good</option>
                        <option value="unaligned">Unaligned</option>
                      </select>
                    </fieldset>
                    <fieldset>
                      <label>Challenge Rating</label>
                      <select {...register(`creatures.${index}.cr`, { required: true })}>
                        <option value="0">0</option>
                        <option value="1/8">1/8</option>
                        <option value="1/4">1/4</option>
                        <option value="1/2">1/2</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                        <option value="23">23</option>
                        <option value="24">24</option>
                        <option value="25">25</option>
                        <option value="26">26</option>
                        <option value="27">27</option>
                        <option value="28">28</option>
                        <option value="29">29</option>
                        <option value="30">30</option>
                      </select>
                    </fieldset>
                    <fieldset>
                      <label>Type</label>
                      <input type="text" {...register(`creatures.${index}.type`, { required: true })}/>
                    </fieldset>
                    <fieldset>
                      <label>Size</label>
                      <select {...register(`creatures.${index}.size`, { required: true })}>
                        <option value="tiny">Tiny</option>
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                        <option value="huge">Huge</option>
                        <option value="gargantuan">Gargantuan</option>
                      </select>
                    </fieldset>
                    <fieldset>
                      <label>Armor Class</label>
                      <input type="text" {...register(`creatures.${index}.ac`, { required: true })}/>
                    </fieldset>
                    <fieldset>
                      <label>Hit Points</label>
                      <input type="text" {...register(`creatures.${index}.hp`, { required: true })}/>
                    </fieldset>
                    <fieldset>
                      <label>Speed</label>
                      <input type="text" {...register(`creatures.${index}.speed`, { required: true })}/>
                    </fieldset>
                    <table>
                      <thead>
                        <tr>
                          <th scope="col">STR</th>
                          <th scope="col">DEX</th>
                          <th scope="col">CON</th>
                          <th scope="col">INT</th>
                          <th scope="col">WIS</th>
                          <th scope="col">CHA</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><input type="number" {...register(`creatures.${index}.str`, { required: true, valueAsNumber: true })}/></td>
                          <td><input type="number" {...register(`creatures.${index}.dex`, { required: true, valueAsNumber: true })}/></td>
                          <td><input type="number" {...register(`creatures.${index}.con`, { required: true, valueAsNumber: true })}/></td>
                          <td><input type="number" {...register(`creatures.${index}.int`, { required: true, valueAsNumber: true })}/></td>
                          <td><input type="number" {...register(`creatures.${index}.wis`, { required: true, valueAsNumber: true })}/></td>
                          <td><input type="number" {...register(`creatures.${index}.cha`, { required: true, valueAsNumber: true })}/></td>
                        </tr>
                      </tbody>
                    </table>
                    <fieldset>
                      <label>Proficiency Bonus</label>
                      <input type="text" {...register(`creatures.${index}.proficiencyBonus`, { required: true })}/>
                    </fieldset>
                    <fieldset>
                      <label>Condition Immunities</label>
                      <input type="text" {...register(`creatures.${index}.conditionImmunities`)}/>
                    </fieldset>
                    <fieldset>
                      <label>Damage Immunities</label>
                      <input type="text" {...register(`creatures.${index}.damageImmunities`)}/>
                    </fieldset>
                    <fieldset>
                      <label>Damage Resistances</label>
                      <input type="text" {...register(`creatures.${index}.damageResistances`)}/>
                    </fieldset>
                    <fieldset>
                      <label>Damage Vulnerabilities</label>
                      <input type="text" {...register(`creatures.${index}.damageVulnerabilities`)}/>
                    </fieldset>
                    <fieldset>
                      <label>Senses</label>
                      <input type="text" {...register(`creatures.${index}.senses`, { required: true })}/>
                    </fieldset>
                    <fieldset>
                      <label>Languages</label>
                      <input type="text" {...register(`creatures.${index}.languages`, { required: true })}/>
                    </fieldset>
                    <fieldset>
                      <h3>Features</h3>
                      <CreatureEntityField
                        control={control}
                        parentIndex={index}
                        register={register}
                        setValue={setValue}
                        type="features"
                      />
                    </fieldset>
                    <fieldset>
                      <h3>Actions</h3>
                      <CreatureEntityField
                        control={control}
                        parentIndex={index}
                        register={register}
                        setValue={setValue}
                        type="actions"
                      />
                    </fieldset>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      creatureRemove(index);
                    }}
                  >
                    Remove
                  </button>
                </div>
              )
            })
          }
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
    </div>
  );
};