<!-- FormGenerator.svelte -->
<script lang="ts">
  import type { InputField } from '@/interfaces/forms.interfaces';

  let { fields = [], onSubmit } = $props<{
    fields: InputField[];
    onSubmit: (formData: Record<string, any>) => void;
  }>();

  const formData = $state<Record<string, any>>({});

  // Initialize form data with default values
  $effect(() => {
    fields.forEach((field: InputField) => {
      if (!(field.id in formData)) {
        formData[field.id] = field.value ?? '';
      }
    });
  });

  function handleSubmit(event: Event) {
    event.preventDefault();
    onSubmit(formData);
  }

  function handleInput(field: InputField, event: Event) {
    const target = event.target as HTMLInputElement;
    formData[field.id] = field.type === 'checkbox' ? target.checked : target.value;
  }
</script>

<form onsubmit={handleSubmit}>
  <div class="grid grid-cols-2 gap-x-3">
    {#each fields as field}
      <div class="form-control {field.fullWidth ? 'col-span-2' : 'col-span-1'}">
        {#if field.type !== 'checkbox'}
          <label
            for={field.id}
            class="label"
          >
            <span class="label-text text-xs">{field.label}</span>
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
              <span class="label-text text-xs">{field.label}</span>
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
            class="input input-bordered w-full"
            bind:value={formData[field.id]}
          />
        {/if}
      </div>
    {/each}
  </div>

  <div class="mt-6 flex justify-end">
    <button
      type="submit"
      class="btn btn-primary">Submit</button
    >
  </div>
</form>
