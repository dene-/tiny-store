<script lang="ts">
  import FormGenerator from '../Form/FormGenerator.svelte';
  import type { InputField } from '@/interfaces/forms.interfaces';

  const formFields: InputField[] = $state([
    {
      id: 'firstName',
      label: 'First Name',
      type: 'text',
      required: true,
      placeholder: 'Enter your first name',
    },
    {
      id: 'lastName',
      label: 'Last Name',
      type: 'text',
      required: true,
      placeholder: 'Enter your last name',
    },
    {
      id: 'email',
      label: 'Email Address',
      type: 'email',
      required: true,
      fullWidth: true,
      placeholder: 'Enter your email',
    },
    {
      id: 'message',
      label: 'Message',
      type: 'textarea',
      placeholder: 'Enter your message',
      fullWidth: true,
    },
    {
      id: 'newsletter',
      label: 'Subscribe to newsletter',
      type: 'checkbox',
      fullWidth: true,
      value: false,
    },
  ]);

  function handleFormSubmit(formData: Record<string, any>) {
    console.log('Form submitted:', formData.name);
    // Handle form submission
  }
</script>

<FormGenerator
  fields={formFields}
  onSubmit={handleFormSubmit}
/>
