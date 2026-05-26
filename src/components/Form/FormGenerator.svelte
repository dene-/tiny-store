<!-- FormGenerator.svelte -->
<script lang="ts">
  import type { Attachment } from 'svelte/attachments';
  import type { FormDataRecord, FormValue, InputField } from '@/interfaces/forms.interfaces';
  import FormField from './FormField.svelte';

  interface Props {
    formName: string;
    buttonText?: string;
    fields: InputField[];
    isProcessing?: boolean;
    onSubmit: (formData: FormDataRecord) => void;
  }

  let { formName, buttonText = 'Submit', fields = [], isProcessing = false, onSubmit }: Props = $props();

  let formElement: HTMLFormElement | undefined;

  const captureFormElement: Attachment<HTMLFormElement> = element => {
    formElement = element;

    return () => {
      if (formElement === element) {
        formElement = undefined;
      }
    };
  };

  function initialValue(field: InputField): FormValue {
    if (field.value !== undefined) return field.value;
    if (field.type === 'checkbox') return false;

    return '';
  }

  function readFormData(form: HTMLFormElement): FormDataRecord {
    const payload: FormDataRecord = {};
    const submittedForm = new FormData(form);

    for (const field of fields) {
      if (field.type === 'checkbox') {
        payload[field.id] = submittedForm.has(field.name || field.id);
      } else {
        payload[field.id] = String(submittedForm.get(field.name || field.id) ?? initialValue(field));
      }
    }

    return payload;
  }

  function handleSubmit(event: Event) {
    event.preventDefault();

    if (event.currentTarget instanceof HTMLFormElement) {
      onSubmit(readFormData(event.currentTarget));
    }
  }

  export function clearForm() {
    formElement?.reset();
  }
</script>

<form
  class={formName}
  onsubmit={handleSubmit}
  autocomplete="on"
  {@attach captureFormElement}
>
  <div class="grid grid-cols-2 gap-3">
    {#each fields as field (field.id)}
      <FormField {field} />
    {/each}
  </div>

  <div class="mt-6 flex justify-center">
    <button
      type="submit"
      class="btn btn-primary btn-lg lg:btn-wide w-full"
      disabled={isProcessing}
    >
      {#if isProcessing}
        <span class="loading loading-spinner"></span>
      {/if}
      {buttonText}
    </button>
  </div>
</form>
