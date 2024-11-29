import { createSpellbook } from '@/utils/api';
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation, useQueryClient } from '@tanstack/react-query';

type Inputs = {
  name: string
};

export interface CreateSpellbookFormProps {
  onSubmitSuccess: () => void;
}

export const CreateSpellbookForm = ({
  onSubmitSuccess
}: CreateSpellbookFormProps) => {
  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm<Inputs>();

  const queryClient = useQueryClient();

  const {
    mutate: createSpellbookMutation
  } = useMutation({
    mutationFn: async (data: Inputs) => {
      return await createSpellbook(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['spellbooks']
      });

      onSubmitSuccess();
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    createSpellbookMutation(data);
  };

  return (
    <div>
      <h2>
        Create Spellbook
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <label>
            Name
          </label>
          <input
            {...register('name', { required: true })}
            type="text"
          />
          {
            errors.name ? (
              <span>
                This field is required
              </span>
            ) : null
          }
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
