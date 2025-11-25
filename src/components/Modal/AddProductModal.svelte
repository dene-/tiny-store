<script lang="ts">
  import { onMount } from 'svelte';
  import { addProductModalStore } from '@/stores/addProductModal.store.svelte';

  import FormGenerator from '../Form/FormGenerator.svelte';
  import type { InputField } from '@/interfaces/forms.interfaces';

  import GalleryComponent from '../Product/GalleryComponent.svelte';
  import { resizeImagesToWebp } from '@/lib/image.lib';

  let avatarFileInput: HTMLInputElement | null = $state(null);
  let images: string[] = $state([]);
  const addProductFormFields: InputField[] = $state([
    {
      id: 'product-name',
      label: 'Product Name',
      type: 'text',
      required: true,
      placeholder: 'Product name',
      fullWidth: true,
      ariaLabel: 'Product Name',
    },
    {
      id: 'product-description',
      label: 'Product Description',
      type: 'textarea',
      required: true,
      placeholder: 'Product description',
      fullWidth: true,
      ariaLabel: 'Product Description',
    },
    {
      id: 'product-price',
      label: 'Product Price',
      type: 'number',
      required: true,
      placeholder: 'Product price',
      ariaLabel: 'Product Price',
    },
    {
      id: 'sku',
      label: 'SKU',
      type: 'text',
      required: true,
      placeholder: 'SKU',
      ariaLabel: 'SKU',
    },
    {
      id: 'product_url',
      label: 'Product URL',
      type: 'text',
      required: true,
      placeholder: 'Product URL',
      ariaLabel: 'Product URL',
    },
  ]);

  async function handleAvatarUpload() {
    images = [];

    if (avatarFileInput?.files && avatarFileInput.files) {
      let files = Array.from(avatarFileInput.files);
      files = await resizeImagesToWebp(
        files,
        files.map(file => file.name.split('.').shift() as string),
      );

      for (let file of files) {
        images.push(URL.createObjectURL(file));
      }
    }
  }

  function onModalClose() {
    images = [];
  }

  onMount(() => {
    addProductModalStore.modal = document.getElementById('addProductModal') as HTMLDialogElement;
  });
</script>

<dialog
  id="addProductModal"
  class="modal"
  onclose={onModalClose}
>
  <div class="modal-box w-11/12 max-w-5xl">
    <h3 class="text-2xl font-bold">Add product</h3>
    <div class="divider"></div>
    <div>
      <GalleryComponent {images} />
      <input
        type="file"
        class="hidden"
        accept="image/jpeg, image/png, image/webp"
        multiple
        bind:this={avatarFileInput}
        onchange={handleAvatarUpload}
      />
      <button
        class="btn btn-ghost btn-sm mt-3"
        onclick={() => avatarFileInput?.click()}>Select product photos</button
      >
      <div class="divider"></div>
      <FormGenerator
        formName="Add Product"
        fields={addProductFormFields}
        buttonText="Add product"
        onSubmit={() => {}}
      />
    </div>
  </div>
</dialog>
