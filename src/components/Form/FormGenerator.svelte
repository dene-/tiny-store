<!-- FormGenerator.svelte -->
<script lang="ts">
  import type { InputField } from '@/interfaces/forms.interfaces';
  import { onMount } from 'svelte';

  interface Props {
    formName: string;
    buttonText?: string;
    fields: InputField[];
    onSubmit: (formData: Record<string, any>) => void;
  }

  let { formName, buttonText = 'Submit', fields = [], onSubmit }: Props = $props();

  const formData = $state<Record<string, any>>({});

  function handleSubmit(event: Event) {
    event.preventDefault();

    onSubmit(formData);
  }

  function handleInput(field: InputField, event: Event) {
    const target = event.target as HTMLInputElement;
    formData[field.id] = field.type === 'checkbox' ? target.checked : target.value;
  }

  $effect(() => {
    fields.forEach((field: InputField) => {
      if (!(field.id in formData)) {
        formData[field.id] = field.value ?? '';
      }
    });
  });

  onMount(() => {
    const query = `.${formName} input, .${formName} select, .${formName} textarea`;

    document.querySelectorAll(query).forEach((input: Element) => {
      input.addEventListener('invalid', () => {
        input.classList.add('input-error');
      });

      input.addEventListener('input', () => {
        input.classList.remove('input-error');
      });
    });
  });

  fields.forEach((field: InputField) => {
    if (!(field.id in formData)) {
      formData[field.id] = field.value ?? '';
    }
  });
</script>

<form
  class={formName}
  onsubmit={handleSubmit}
>
  <div class="grid grid-cols-2 gap-x-3">
    {#each fields as field}
      <div class="form-control {field.fullWidth ? 'col-span-2' : 'col-span-1'}">
        {#if field.type !== 'checkbox'}
          <label
            for={field.id}
            class="label"
          >
            <span class="label-text text-xs">{field.label}{field.required ? '*' : ''}</span>
          </label>
        {/if}

        {#if field.type === 'textarea'}
          <textarea
            id={field.id}
            name={field.id}
            placeholder={field.placeholder}
            required={field.required}
            class="textarea textarea-bordered h-24"
            bind:value={formData[field.id]}
          ></textarea>
        {:else if field.type === 'select'}
          <select
            id={field.id}
            name={field.id}
            required={field.required}
            class="select select-bordered w-full"
            bind:value={formData[field.id]}
          >
            <option value="">Select an option</option>
            {#each field.options || [] as option}
              <option value={option.value}>{option.label}</option>
            {/each}
          </select>
        {:else if field.type === 'checkbox'}
          <div class="form-control">
            <label class="label cursor-pointer">
              <span class="label-text text-xs">{field.label}{field.required ? '*' : ''}</span>
              <input
                type="checkbox"
                class="checkbox"
                id={field.id}
                name={field.id}
                checked={formData[field.id]}
                onchange={e => handleInput(field, e)}
              />
            </label>
          </div>
        {:else}
          <input
            type={field.type}
            id={field.id}
            name={field.id}
            placeholder={field.placeholder}
            required={field.required}
            pattern={field.validation?.pattern}
            minlength={field.validation?.minLength}
            maxlength={field.validation?.maxLength}
            min={field.validation?.min}
            max={field.validation?.max}
            autocomplete={'new-password'}
            class="input input-bordered w-full"
            bind:value={formData[field.id]}
          />
        {/if}
      </div>
    {/each}
  </div>

  <div class="mt-6 flex justify-center">
    <button
      type="submit"
      class="btn btn-primary btn-wide">{buttonText}</button
    >
  </div>
</form>
