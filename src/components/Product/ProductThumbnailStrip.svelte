<script lang="ts">
  import type { Attachment } from 'svelte/attachments';
  import type { Image } from '@/interfaces/store.interfaces';

  let {
    images,
    selectedIndex,
    onSelect,
  }: {
    images: Image[];
    selectedIndex: number;
    onSelect: (index: number) => void;
  } = $props();

  let thumbnailContainer: HTMLDivElement | undefined;
  const scrollAmount = 100;

  const captureThumbnailContainer: Attachment<HTMLDivElement> = element => {
    thumbnailContainer = element;

    return () => {
      if (thumbnailContainer === element) {
        thumbnailContainer = undefined;
      }
    };
  };

  function scrollThumbnails(direction: 'left' | 'right') {
    if (!thumbnailContainer) return;

    thumbnailContainer.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  }
</script>

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
    {@attach captureThumbnailContainer}
    class="no-scrollbar flex gap-2 overflow-x-auto scroll-smooth px-8"
    style="scrollbar-width: none; -ms-overflow-style: none;"
  >
    {#each images as image, index (image.id || image.src)}
      <button
        class="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all {index === selectedIndex
          ? 'border-primary opacity-100'
          : 'border-transparent opacity-60 hover:opacity-100'}"
        onclick={() => onSelect(index)}
        aria-label={`View image ${index + 1}`}
      >
        <img
          src={image.thumbnail || image.src}
          alt={image.alt}
          class="h-full w-full object-cover"
          loading="lazy"
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
