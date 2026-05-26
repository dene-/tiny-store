<script lang="ts">
  import type { Image } from '@/interfaces/store.interfaces';
  import ProductImagePopover from './ProductImagePopover.svelte';
  import ProductThumbnailStrip from './ProductThumbnailStrip.svelte';

  let { images }: { images: Image[] } = $props();

  let selectedIndex = $state(0);
  let selectedImage = $derived(images[selectedIndex] || images[0]);

  let popoverId = $derived(`product-image-popover-${imageSetId(images)}`);

  function imageSetId(productImages: Image[]) {
    const key = productImages.map(image => image.id || image.src).join('-') || 'empty';

    return key.replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 80);
  }

  function selectImage(index: number) {
    selectedIndex = index;
  }
</script>

{#if selectedImage}
  <button
    class="block w-full cursor-zoom-in border-none bg-transparent p-0"
    popovertarget={popoverId}
    type="button"
    aria-label="View full screen image"
  >
    <img
      src={selectedImage.src}
      alt={selectedImage.alt}
      title={selectedImage.alt}
      srcset={selectedImage.srcset}
      sizes={selectedImage.sizes}
      class="lg:border-base-300 h-auto w-full bg-white object-cover lg:rounded-md lg:border lg:shadow-md"
      loading="lazy"
    />
  </button>

  {#if images.length > 1}
    <ProductThumbnailStrip
      {images}
      {selectedIndex}
      onSelect={selectImage}
    />
  {/if}

  <ProductImagePopover
    image={selectedImage}
    {popoverId}
  />
{:else}
  <div class="lg:border-base-300 flex aspect-square w-full items-center justify-center bg-white text-sm text-gray-500 lg:rounded-md lg:border lg:shadow-md">
    No image available
  </div>
{/if}
