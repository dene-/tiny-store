<script lang="ts">
  import type { Image } from '@/interfaces/store.interfaces';
  import { setProductImagePopoverLock } from './product-image-popover';

  let { image, popoverId }: { image: Image; popoverId: string } = $props();

  function handlePopoverToggle(event: Event) {
    const toggleEvent = event as ToggleEvent;

    setProductImagePopoverLock(document.documentElement, toggleEvent.newState === 'open');
  }
</script>

<div
  id={popoverId}
  popover="auto"
  ontoggle={handlePopoverToggle}
  class="m-0 h-screen max-h-none w-screen max-w-none overflow-hidden border-none bg-transparent p-0 backdrop:bg-black/90"
>
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

  <img
    src={image.src}
    alt={image.alt}
    class="pointer-events-none h-full w-full object-contain select-none"
  />
</div>

<style>
  [popover]:popover-open {
    display: flex;
    justify-content: center;
    align-items: center;
    inset: 0;
  }

  :global(html.has-product-image-popover) {
    overflow: hidden;
  }
</style>
