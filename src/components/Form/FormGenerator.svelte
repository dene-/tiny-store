<!-- FormGenerator.svelte -->
<script lang="ts">
  import type { InputField } from '@/interfaces/forms.interfaces';
  import { onMount } from 'svelte';

  interface Props {
    formName: string;
    buttonText?: string;
    fields: InputField[];
    isProcessing?: boolean;
    onSubmit: (formData: Record<string, any>) => void;
  }

  let { formName, buttonText = 'Submit', fields = [], isProcessing = false, onSubmit }: Props = $props();

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
        input.setAttribute('aria-invalid', 'true');
      });

      input.addEventListener('input', () => {
        input.classList.remove('input-error');
        input.setAttribute('aria-invalid', 'false');
      });
    });
  });

  fields.forEach((field: InputField) => {
    if (!(field.id in formData)) {
      formData[field.id] = field.value ?? '';
    }
  });

  export function clearForm() {
    fields.forEach(field => {
      formData[field.id] = field.value ?? (field.type === 'checkbox' ? false : '');
    });
  }
</script>

<form
  class={formName}
  onsubmit={handleSubmit}
  autocomplete="on"
>
  <div class="grid grid-cols-2 gap-3">
    {#each fields as field}
      <div class="form-control {field.fullWidth ? 'col-span-2' : 'col-span-1'}">
        {#if field.type !== 'checkbox'}
          <label
            for={field.id}
            class="label"
          >
            <span class="label-text text-sm font-semibold">{field.label}{field.required ? '*' : ''}</span>
          </label>
        {/if}

        {#if field.type === 'textarea'}
          <textarea
            id={field.id}
            name={field.name || field.id}
            placeholder={field.placeholder}
            required={field.required}
            aria-required={field.required}
            aria-label={field.ariaLabel || field.label}
            class="textarea textarea-lg textarea-bordered h-24 bg-white"
            bind:value={formData[field.id]}
          ></textarea>
        {:else if field.type === 'select'}
          <select
            id={field.id}
            name={field.name || field.id}
            required={field.required}
            aria-required={field.required}
            aria-label={field.ariaLabel || field.label}
            class="select select-bordered select-lg w-full bg-white"
            bind:value={formData[field.id]}
            autocomplete={field.name === 'country' ? 'country' : 'off'}
          >
            <option
              value=""
              disabled>Select an option</option
            >
            {#each field.options || [] as option}
              <option
                value={option.value}
                selected={option.selected}>{option.label}</option
              >
            {/each}
          </select>
        {:else if field.type === 'checkbox'}
          <div class="form-control">
            <label class="label cursor-pointer">
              <span class="label-text text-xs">{field.label}{field.required ? '*' : ''}</span>
              <input
                type="checkbox"
                class="checkbox checkbox-lg bg-white"
                id={field.id}
                name={field.name || field.id}
                checked={formData[field.id]}
                onchange={e => handleInput(field, e)}
                aria-label={field.ariaLabel || field.label}
                aria-required={field.required}
              />
            </label>
          </div>
        {:else}
          <input
            type={field.type}
            id={field.id}
            name={field.name || field.id}
            placeholder={field.placeholder}
            required={field.required}
            aria-required={field.required}
            aria-label={field.ariaLabel || field.label}
            pattern={field.validation?.pattern}
            minlength={field.validation?.minLength}
            maxlength={field.validation?.maxLength}
            min={field.validation?.min}
            max={field.validation?.max}
            class="input input-lg input-bordered w-full bg-white"
            bind:value={formData[field.id]}
          />
        {/if}
      </div>
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
