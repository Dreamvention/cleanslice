import { ref } from 'vue';
import { CreateTeamDto } from '#api/data';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { pages } from '../pages';

export const useFormTeams = () => {
  const app = useNuxtApp();
  const _loading = ref(false);

  // Validation schema
  const schema = toTypedSchema(
    z.object({
      name: z
        .string()
        .min(2, 'Team name must be at least 2 characters.')
        .max(50, 'Team name must not exceed 50 characters.'),
      codename: z
        .string()
        .min(3, 'Codename must be at least 3 characters.')
        .max(20, 'Codename must not exceed 20 characters.')
        .regex(/^[a-zA-Z0-9-]+$/, 'Only letters, numbers, and dashes are allowed.'),
    }),
  );

  const form = useForm({
    validationSchema: schema,
  });

  const onSubmit = form.handleSubmit(async (values: any) => {
    _loading.value = true;
    const teamsStore = useTeamsStore();

    const data = {
      name: values.name,
      codename: values.codename, // Include codename in submission
    } as CreateTeamDto;

    await teamsStore.createTeam(data);

    navigateTo({ name: pages.agents, params: { teamId: teamsStore.team.codename } });
    _loading.value = false;
  });

  return { _loading, onSubmit, form };
};
