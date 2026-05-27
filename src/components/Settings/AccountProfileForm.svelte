<script lang="ts">
  import FormGenerator from '@/components/Form/FormGenerator.svelte';
  import type { AccountUser } from '@/features/account/account.types';
  import type { FormDataRecord, InputField } from '@/interfaces/forms.interfaces';

  let {
    user,
    onSubmit,
  }: {
    user: AccountUser;
    onSubmit: (formData: FormDataRecord) => Promise<void> | void;
  } = $props();

  const formFields: InputField[] = $derived([
    {
      id: 'name',
      label: 'Name',
      type: 'text',
      required: true,
      value: user.name,
      placeholder: 'Enter your name',
      ariaLabel: 'Name',
    },
    {
      id: 'username',
      label: 'Username',
      type: 'text',
      required: true,
      value: user.prefs.username || '',
      placeholder: 'Enter your username',
      ariaLabel: 'Username',
    },
    {
      id: 'email',
      label: 'Email Address',
      type: 'email',
      required: true,
      fullWidth: true,
      value: user.email,
      placeholder: 'Enter your email',
      ariaLabel: 'Email Address',
    },
    {
      id: 'password',
      label: 'Password',
      type: 'password',
      required: true,
      value: '',
      placeholder: 'Enter your password',
      ariaLabel: 'Password',
    },
  ]);
</script>

<FormGenerator
  formName="user-form"
  buttonText="Save"
  fields={formFields}
  {onSubmit}
/>
