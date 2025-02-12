<script>
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";
  import { fetchProjects } from "../../lib/fetchSanityData";
  import PhotoGalleryModal from "../navigation/workPhotoGallery.svelte";
  import MobilePhotoGalleryModal from "../navigation/mobileModalPhotoGallery.svelte";
  import { browser } from "$app/environment";

  export let currentIndex = 0; // Declare currentIndex at the top
  export let isWorkOpen = false;
  export let isClosing = false;
  export let isWhiteBackground = false; // Bind this prop to detect menu close

  const dispatch = createEventDispatcher();

  let works = [];
  let selectedWork = null;
  let currentPhotos = [];
  let galleryVisible = false;
  let slideshowVisible = false;
  let initialPhotoIndex = 0;
  let isFullWidth = false;
  let hoveredWork = null; // Tracks the currently hovered project

  onMount(async () => {
    await loadProjects();
  });

  async function loadProjects() {
    try {
      works = await fetchProjects();
      works.sort((a, b) => a.order - b.order);
      // console.log("Projects loaded:", works);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  }

  let fadingOut = false; // ✅ Track fade-out state
  let hasExpanded = false; // ✅ Ensure delay happens only once

  function handleHoverStart(work) {
  if (work.photos && work.photos.length > 0 && window.innerWidth > 768) {
    if (hoveredWork === work) return;

    hoveredWork = work;

    if (!hasExpanded) {
      isFullWidth = true;
      hasExpanded = true;

      setTimeout(() => {
        if (hoveredWork === work) {
          galleryVisible = true; // ✅ Show the gallery first
          
          setTimeout(() => {
            currentPhotos = work.photos; // ✅ THEN insert images
            fadingOut = false;
          }, 10); // ✅ Slight delay allows animation to trigger
        }
      }, 1000); // ✅ Wait for menu animation to finish
    } else {
      fadingOut = true;

      setTimeout(() => {
        if (hoveredWork === work) {
          galleryVisible = true; 

          setTimeout(() => {
            currentPhotos = work.photos;
            fadingOut = false;
          }, 10);
        }
      }, 300);
    }
  }
}


  // Keep gallery visible until another project title is hovered
  function handleHoverEnd() {
    // No action needed, keep the gallery visible until another title is hovered
  }

  // Show the first image in the slideshow when the project title is clicked
  function showPhotos(work) {
    if (work.photos && work.photos.length > 0) {
      dispatch("openSlideshow", {
        images: work.photos,
        index: 0,
        title: work.title,
      });
      console.log("work photos clicked");
      // selectedWork = work.title;
      // currentPhotos = work.photos;
      // initialPhotoIndex = 0;
      // slideshowVisible = true;
    }
  }

  // Close the slideshow modal
  function closeSlideshowModal() {
    slideshowVisible = false;
  }

  function handleOpenSlideshow(event) {
    // Forward the event to the layout
    dispatch("openSlideshow", event.detail);
  }

  // Reset the menu state when it is closed
  $: if (!isWorkOpen && isClosing) {
    isFullWidth = false; // Revert menu width to 50%
    galleryVisible = false; // Close the photo gallery modal
  }

  let windowWidth = 0; // Initialize windowWidth

  if (browser) {
    windowWidth = window.innerWidth;
  }

  // Update window width on resize
  function handleResize() {
    if (browser) {
      windowWidth = window.innerWidth;
    }
  }

  // Set up event listener for window resizing
  onMount(() => {
    if (browser) {
      window.addEventListener("resize", handleResize);
    }
    return () => {
      if (browser) {
        window.removeEventListener("resize", handleResize);
      }
    };
  });
</script>

<!-- Menu Wrapper -->
<div
  class={`menu-content ${isWorkOpen ? (isClosing ? "slide-out" : "slide-in") : ""} ${isFullWidth ? "full-width" : ""}`}
  style="z-index: {isWorkOpen || isClosing
    ? 2000
    : 0}; pointer-events: {isWorkOpen || isClosing ? 'auto' : 'none'};"
  on:click|stopPropagation
>
  <!-- Menu Content -->
  <div class="menu">
    <div class="menu-left">
      <div class={`menu-content-list ${isWorkOpen ? "menu-open" : ""}`}>
        {#each works as work, index (work._id || index)}
          <p
            class="work-title hover:text-black"
            on:mouseover={() => handleHoverStart(work)}
            on:mouseleave={handleHoverEnd}
            on:click={() => showPhotos(work)}
            class:selected={selectedWork === work.title}
            style="opacity: {hoveredWork && hoveredWork !== work ? 0.5 : 1};"
          >
            {work.title}
          </p>
        {/each}
      </div>
    </div>
  </div>

  <!-- Photo Gallery Modal -->
  {#if galleryVisible && hoveredWork}
    {#if windowWidth > 768}
      <!-- Regular Photo Gallery -->
      <div class="gallery-container" on:openSlideshow={handleOpenSlideshow}>
        <PhotoGalleryModal
          {currentPhotos}
          {fadingOut}
          projectTitle={hoveredWork?.title}
          initialPhotoIndex={0}
          on:openSlideshow={handleOpenSlideshow}
          close={() => {
            galleryVisible = false;
            hoveredWork = null;
          }}
        />
      </div>
    {:else}
      <!-- Mobile Photo Gallery -->
      <MobilePhotoGalleryModal
        {currentPhotos}
        projectTitle={hoveredWork?.title}
        initialPhotoIndex={0}
        on:openSlideshow={handleOpenSlideshow}
        close={() => {
          galleryVisible = false;
          hoveredWork = null;
        }}
      />
    {/if}
  {/if}
</div>

<style>
  .menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }

  .menu-content {
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    background-color: white;
    transform: translateX(-100%);
    transition:
      transform 1s cubic-bezier(0.25, 1, 0.5, 1),
      width 1s cubic-bezier(0.42, 0, 0.58, 1);
  }

  .slide-in {
    transform: translateX(0);
  }

  .slide-out {
    transform: translateX(-100%);
  }

  .full-width {
    width: 100%;
  }

  .menu-content-list {
    padding: 2.5rem;
  }

  .work-title {
    font-size: 1rem;
    margin-bottom: 1rem;
    width: fit-content;
    cursor: pointer;
    opacity: 0;
    transform: translate(25%, 0%);
    z-index: 3001;
    position: relative;
    transition:
      opacity 1s cubic-bezier(0.25, 1, 0.5, 1),
      transform 1s cubic-bezier(0.25, 1, 0.5, 1);
  }
  @media (max-width: 1105px) {
    .work-title {
      font-size: 0.875rem;
      margin-right: 2.5rem;
    }
  }

  @media (max-width: 768px) {
    .work-title {
      font-size: 0.825rem;
      transform: translate(-50%, 0%); /* Slide further to the left */
    }
    .menu-content-list {
      padding: 1.5rem;
    }
    .menu-content {
      width: 100%;
    }
    .menu-open .work-title {
      transform: translate(-100%, 0%); /* Slide titles fully out of view */
    }
  }

  .menu-open .work-title {
    opacity: 1;
    transform: translate(0%, 0%);
  }

  .hover\:text-black:hover {
    color: black;
  }

  .gallery-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
</style>
