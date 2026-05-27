<script lang="ts">
  import DeleteIcon from '../Icons/DeleteIcon.svelte';
  import DuplicateIcon from '../Icons/DuplicateIcon.svelte';
  import EditIcon from '../Icons/EditIcon.svelte';
</script>

<div class="flex justify-end gap-1">
  <button
    class="btn btn-ghost btn-xs aspect-square p-0"
    title="Edit"
    aria-label="Edit"
    disabled
  >
    <EditIcon />
  </button>

  <button
    class="btn btn-ghost btn-xs aspect-square p-0"
    title="Duplicate"
    aria-label="Duplicate"
    disabled
  >
    <DuplicateIcon />
  </button>

  <button
    class="btn btn-ghost btn-xs text-error aspect-square p-0"
    title="Delete"
    aria-label="Delete"
    disabled
  >
    <DeleteIcon />
  </button>
</div>
