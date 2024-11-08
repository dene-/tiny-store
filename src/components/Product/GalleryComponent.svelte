<script lang="ts">
  let { images = [] } = $props<{ images: string[] }>();
  let selectedImage = $state(images[0] || '');
  let carouselRef: HTMLDivElement;

  function selectImage(image: string) {
    selectedImage = image;
  }

  function scrollCarousel(direction: 'left' | 'right') {
    if (carouselRef) {
      const scrollAmount = 200; // Adjust this value to control scroll distance
      const newScrollPosition = direction === 'left' ? carouselRef.scrollLeft - scrollAmount : carouselRef.scrollLeft + scrollAmount;

      carouselRef.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth',
      });
    }
  }

  $effect(() => {
    if (images.length && !selectedImage) {
      selectedImage = images[0];
    }

    console.log('Effect');
  });
</script>

{#if !images.length}
  <div class="flex h-72 items-center justify-center">
    <span class="text-gray-500">No images</span>
  </div>
{:else}
  <div class="mx-auto flex w-full max-w-lg flex-col gap-4">
    <!-- Main Image -->
    <div class="relative flex aspect-video max-h-[364px] w-full max-w-lg justify-center">
      {#if selectedImage}
        <!-- svelte-ignore a11y_img_redundant_alt -->
        <img
          src={selectedImage}
          alt="Gallery image"
          class="rounded-lg"
        />
      {/if}
    </div>

    <!-- Carousel Navigation -->
    <div class="relative flex w-full items-center py-2">
      <button
        class="btn btn-primary btn-sm mr-2"
        onclick={() => scrollCarousel('left')}
      >
        ❮
      </button>

      <div
        bind:this={carouselRef}
        class="hide-scrollbar flex snap-proximity gap-2 overflow-x-auto scroll-smooth"
      >
        {#each images as image}
          <div
            class="h-24 w-24 flex-none cursor-pointer transition-all duration-200 hover:brightness-75"
            onclick={() => selectImage(image)}
            onkeydown={e => e.key === 'Enter' && selectImage(image)}
            role="button"
            tabindex="0"
          >
            <img
              src={image}
              alt="Gallery thumbnail"
              class="h-full w-full rounded-md object-cover"
            />
          </div>
        {/each}
      </div>

      <button
        class="btn btn-primary btn-sm ml-2"
        onclick={() => scrollCarousel('right')}
      >
        ❯
      </button>
    </div>
  </div>
{/if}

<style>
  /* Hide scrollbar but keep functionality */
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
</style>
