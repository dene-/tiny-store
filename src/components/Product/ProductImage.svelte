<script lang="ts">
  import type { Image } from '@/interfaces/store.interfaces';

  let { images }: { images: Image[] } = $props();

  let selectedIndex = $state(0);
  let selectedImage = $derived(images[selectedIndex] || images[0]);

  const popoverId = `product-image-popover-${Math.random().toString(36).substr(2, 9)}`;

  let thumbnailContainer = $state<HTMLDivElement>();
  const scrollAmount = 100;

  function scrollThumbnails(direction: 'left' | 'right') {
    if (!thumbnailContainer) return;

    if (direction === 'left') {
      thumbnailContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      thumbnailContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }

  function handlePopoverToggle(event: Event) {
    const toggleEvent = event as any;

    if (toggleEvent.newState === 'open') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
</script>

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
  <div class="relative mt-4 flex items-center gap-2">
    <button
      class="btn btn-circle btn-sm btn-ghost bg-base-100/80 absolute left-0 z-10 backdrop-blur-sm"
      onclick={() => scrollThumbnails('left')}
      aria-label="Scroll thumbnails left"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-4"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.75 19.5L8.25 12l7.5-7.5"
        ></path>
      </svg>
    </button>

    <div
      bind:this={thumbnailContainer}
      class="no-scrollbar flex gap-2 overflow-x-auto scroll-smooth px-8"
      style="scrollbar-width: none; -ms-overflow-style: none;"
    >
      {#each images as img, index}
        <button
          class="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all {index === selectedIndex
            ? 'border-primary opacity-100'
            : 'border-transparent opacity-60 hover:opacity-100'}"
          onclick={() => (selectedIndex = index)}
          aria-label={`View image ${index + 1}`}
        >
          <img
            src={img.thumbnail || img.src}
            alt={img.alt}
            class="h-full w-full object-cover"
          />
        </button>
      {/each}
    </div>

    <button
      class="btn btn-circle btn-sm btn-ghost bg-base-100/80 absolute right-0 z-10 backdrop-blur-sm"
      onclick={() => scrollThumbnails('right')}
      aria-label="Scroll thumbnails right"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-4"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M8.25 4.5l7.5 7.5-7.5 7.5"
        ></path>
      </svg>
    </button>
  </div>
{/if}

<div
  id={popoverId}
  popover="auto"
  ontoggle={handlePopoverToggle}
  class="m-0 h-screen max-h-none w-screen max-w-none overflow-hidden border-none bg-transparent p-0 backdrop:bg-black/90"
>
  <!-- Close button -->
  <button
    class="btn btn-circle btn-primary absolute top-4 right-4 z-50"
    popovertarget={popoverId}
    popovertargetaction="hide"
    aria-label="Close full screen image"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="size-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18L18 6M6 6l12 12"
      ></path>
    </svg>
  </button>

  <!-- Full screen image -->
  <img
    src={selectedImage.src}
    alt={selectedImage.alt}
    class="pointer-events-none h-full w-full object-contain select-none"
  />
</div>

<style>
  /* Ensure the popover is centered and covers the screen */
  [popover]:popover-open {
    display: flex;
    justify-content: center;
    align-items: center;
    inset: 0;
  }
</style>
