<script>
  import { onMount } from "svelte";
  import { fetchProjects } from "../../lib/fetchSanityData";
  import PhotoGalleryModal from "../navigation/workPhotoGallery.svelte";
  import MobilePhotoGalleryModal from "../navigation/mobileModalPhotoGallery.svelte";

  export let isOpen = false;
  export let toggleMenu;
  export let isFadingOut = false;
  let works = [];
  let currentPhotos = [];
  let galleryVisible = false;
  let selectedWork = null;
  let isWhiteBackground = false;
  let isMobile = false;
  let zIndexClass = "";

  onMount(() => {
    const checkScreenSize = () => {
      isMobile = window.innerWidth <= 768;
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  });

  async function loadProjects() {
    try {
      works = await fetchProjects();
      console.log("Projects fetched:", works);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  }

  function showPhotos(work) {
    if (work.photos && work.photos.length > 0) {
      selectedWork = work.title;
      currentPhotos = work.photos;
      galleryVisible = true;
      isWhiteBackground = true;
    } else {
      galleryVisible = false;
      isWhiteBackground = false;
      selectedWork = null;
      currentPhotos = [];
    }
  }

  function closeMenu() {
    isFadingOut = true;
    setTimeout(() => {
      isFadingOut = false;
      isWhiteBackground = false;
      galleryVisible = false;
      selectedWork = null;
      currentPhotos = [];
      isOpen = false;
      toggleMenu();
      zIndexClass = "";
    }, 300);
  }

  $: if (isOpen) {
    if (works.length === 0) {
      loadProjects();
    }
    zIndexClass = "z-index-top";
  } else if (!isOpen && !isFadingOut) {
    zIndexClass = "";
  }
</script>

<div class={`menu-container ${isOpen ? "open" : ""} ${zIndexClass}`}>
  {#if isOpen}
    <div
      class={`opacity-layer ${isFadingOut ? "fade-out" : "fade-in"} ${isWhiteBackground ? "white-bg" : ""}`}
      on:click={closeMenu}
    ></div>
  {/if}
  <div
    class={`menu ${isOpen ? "menu-open" : "menu-close"} ${galleryVisible ? "full-width" : ""}`}
  >
    <div class="menu-left">
      <div class="menu-content">
        {#each works as work, index (work._id || index)}
          <p
            class="hover:!text-black/100"
            on:click={() => showPhotos(work)}
            class:selected={selectedWork === work.title}
          >
            {work.title}
          </p>
        {/each}
      </div>
    </div>

    {#if galleryVisible}
      <!-- Use MobilePhotoGalleryModal on mobile, and PhotoGalleryModal on larger screens -->
      <div class="mobile:block desktop:hidden">
        <MobilePhotoGalleryModal
          {currentPhotos}
          projectTitle={selectedWork}
          close={() => {
            galleryVisible = false;
            isWhiteBackground = false;
          }}
        />
      </div>
      <div class="mobile:hidden tablet:hidden desktop:block">
        <PhotoGalleryModal
          {currentPhotos}
          projectTitle={selectedWork}
          close={() => {
            galleryVisible = false;
            isWhiteBackground = false;
          }}
        />
      </div>
    {/if}
  </div>
</div>

<style>
  .menu-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    z-index: 1000; /* Lower initial value */
  }

  .opacity-layer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0);
    transition: background-color 0.5s ease-in-out;
    z-index: 1000; /* Ensure this is behind the menu */
  }

  .opacity-layer.fade-in {
    background-color: rgba(0, 0, 0, 0.6);
  }

  .opacity-layer.fade-out {
    background-color: rgba(0, 0, 0, 0);
  }

  .opacity-layer.white-bg {
    background-color: white;
  }

  .menu {
    position: relative;
    width: 50%;
    height: 100%;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 3rem;
    transition:
      transform 0.3s ease-in-out,
      width 0.3s ease-in-out;
    z-index: 1000; /* Ensure this is above the opacity layer */
    transform: translateX(-100%); /* Initial position off-screen */
  }

  .menu.full-width {
    width: 100%;
  }

  .menu-open {
    transform: translateX(0);
  }

  .menu-close {
    transform: translateX(-100%);
  }

  .menu-content {
    text-align: left;
    width: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .menu-content p {
    display: inline-block;
    margin-bottom: 1em;
    cursor: pointer;
    transition: color 0.3s ease-in-out;
  }

  .menu-content p.selected {
    color: black;
    font-weight: bold;
  }

  .menu-content p:not(.selected) {
    color: grey;
  }

  @media (max-width: 768px) {
    .menu {
      width: 100%;
      padding: 0;
    }
    .menu-content {
      padding: 1.5rem;
    }
    .mobile\:hidden {
      display: none;
    }
    .mobile\:block {
      display: block;
    }
  }

  .z-index-top {
    z-index: 2000; /* Ensure it is above other content */
  }
</style>
