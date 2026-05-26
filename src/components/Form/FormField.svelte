<script lang="ts">
  import type { FormValue, InputField } from '@/interfaces/forms.interfaces';

  interface Props {
    field: InputField;
  }

  let { field }: Props = $props();

  const fieldName = $derived(field.name || field.id);
  const label = $derived(`${field.label}${field.required ? '*' : ''}`);
  const value = $derived((field.value ?? '') as FormValue);
  const textValue = $derived(String(field.value ?? ''));
</script>

<div class="form-control {field.fullWidth ? 'col-span-2' : 'col-span-1'}">
  {#if field.type !== 'checkbox'}
    <label
      for={field.id}
      class="label"
    >
      <span class="label-text text-sm font-semibold">{label}</span>
    </label>
  {/if}

  {#if field.type === 'textarea'}
    <textarea
      id={field.id}
      name={fieldName}
      placeholder={field.placeholder}
      required={field.required}
      aria-required={field.required}
      aria-label={field.ariaLabel || field.label}
      class="textarea textarea-lg textarea-bordered invalid:textarea-error h-24 bg-white"
      value={textValue}
    ></textarea>
  {:else if field.type === 'select'}
    <select
      id={field.id}
      name={fieldName}
      required={field.required}
      aria-required={field.required}
      aria-label={field.ariaLabel || field.label}
      class="select select-bordered select-lg invalid:select-error w-full bg-white"
      value={textValue}
      autocomplete={field.name === 'country' ? 'country' : 'off'}
    >
      <option
        value=""
        disabled>Select an option</option
      >
      {#each field.options || [] as option (option.value)}
        <option value={option.value}>{option.label}</option>
      {/each}
    </select>
  {:else if field.type === 'checkbox'}
    <div class="form-control">
      <label class="label cursor-pointer">
        <span class="label-text text-xs">{label}</span>
        <input
          type="checkbox"
          class="checkbox checkbox-lg invalid:checkbox-error bg-white"
          id={field.id}
          name={fieldName}
          checked={Boolean(value)}
          aria-label={field.ariaLabel || field.label}
          aria-required={field.required}
        />
      </label>
    </div>
  {:else}
    <input
      type={field.type}
      id={field.id}
      name={fieldName}
      placeholder={field.placeholder}
      required={field.required}
      aria-required={field.required}
      aria-label={field.ariaLabel || field.label}
      pattern={field.validation?.pattern}
      minlength={field.validation?.minLength}
      maxlength={field.validation?.maxLength}
      min={field.validation?.min}
      max={field.validation?.max}
      class="input input-lg input-bordered invalid:input-error w-full bg-white"
      value={textValue}
    />
  {/if}
</div>
