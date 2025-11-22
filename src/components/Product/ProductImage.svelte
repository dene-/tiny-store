<script lang="ts">
  import type { Image } from '@/interfaces/store.interfaces';

  let { image }: { image: Image } = $props();

  const popoverId = `product-image-popover-${image.id || Math.random().toString(36).substr(2, 9)}`;
</script>

<button
  class="block w-full cursor-zoom-in border-none bg-transparent p-0"
  popovertarget={popoverId}
  type="button"
  aria-label="View full screen image"
>
  <img
    src={image.src}
    alt={image.alt}
    title={image.alt}
    class="lg:border-base-300 h-auto w-full bg-white lg:rounded-md lg:border lg:shadow-md"
  />
</button>

<div
  id={popoverId}
  popover="auto"
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
    src={image.src}
    alt={image.alt}
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
