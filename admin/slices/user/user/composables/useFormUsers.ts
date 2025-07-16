import { ref } from 'vue';
import { UsersService, UserDto, AdminSystemRolesService } from '#api';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { pages } from '../pages';
import { useRoute } from 'vue-router';
export const useFormUsers = (user: UserDto) => {
  const _loading = ref(false);
  const roles = ref<{ label: string; value: string }[]>([]);
  const getRoles = async () => {
    const response = await AdminSystemRolesService.getAdminSystemRoles();
    roles.value = response?.data?.data?.map((role) => ({ label: role, value: role }));
  };
  const route = useRoute();
  getRoles();
  // Validation schema
  const schema = toTypedSchema(
    z.object({
      name: z.string().min(2, 'Name must be at least 2 characters'),
      email: z.string().email('Invalid email format'),
      adminRole: z.string(),
      banned: z.boolean().default(false),
      verified: z.boolean().default(false),
    }),
  );

  const form = useForm({
    validationSchema: schema,
    initialValues: {
      name: user.name,
      email: user.email,
      adminRole: user.adminRole,
      banned: user.banned,
      verified: user.verified,
    },
  });

  const onSubmit = form.handleSubmit(async (values: any) => {
    console.log('values', values);
    try {
      _loading.value = true;
      const response = await UsersService.updateUser({
        body: {
          name: values.name,
          email: values.email,
          adminRole: values.adminRole,
          banned: values.banned,
          verified: values.verified,
        },
        path: {
          id: route.params.id as string,
        },
      });

      if (response.status === 200) {
        navigateTo({
          name: pages.users,
        });
      }
    } catch (error) {
      console.error('Error updating user:', error);
    } finally {
      _loading.value = false;
    }
  });

  return { _loading, onSubmit, form, roles };
};
