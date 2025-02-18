<script>
  import "../app.css";
  import WorkMenu from "../components/navigation/workSlideOutMenu.svelte";
  import AboutMenu from "../components/navigation/aboutSlideOutMenu.svelte";
  import OpacityLayer from "../components/navigation/opacityLayer.svelte";
  import SlideshowModal from "../components/navigation/slideshow.svelte";
  import { onMount } from "svelte";

  let isWorkOpen = false;
  let isAboutOpen = false;
  let isClosing = false;
  let isVisible = false;
  let hoverOnWork = false;
  let hoverOnContact = false;
  let isWhiteBackground = false;

  let slideshowVisible = false;
  let slideshowImages = [];
  let currentIndex = 0;
  let projectTitle = "";

  function openWorkMenu() {
    if (isWorkOpen) {
      // If the Work menu is already open, close it
      closeAll();
    } else {
      // Close About Menu if it's open, then open Work Menu
      if (isAboutOpen) {
        closeAll(() => {
          isWorkOpen = true;
          isVisible = true; // Ensure opacity layer is visible
        });
      } else {
        isWorkOpen = true;
        isVisible = true; // Ensure opacity layer is visible
      }
    }
  }

  function openAboutMenu() {
    if (isAboutOpen) {
      // If the About menu is already open, close it
      closeAll();
    } else {
      // Close Work Menu if it's open, then open About Menu
      if (isWorkOpen) {
        closeAll(() => {
          isAboutOpen = true;
          isVisible = true; // Ensure opacity layer is visible
        });
      } else {
        isAboutOpen = true;
        isVisible = true; // Ensure opacity layer is visible
      }
    }
  }

  function closeAll(callback) {
    if (isWorkOpen || isAboutOpen) {
      isClosing = true; // Start closing animation
      isWorkOpen = false;
      isAboutOpen = false;
      isWhiteBackground = false; // Reset background state for work menu

      setTimeout(() => {
        isClosing = false;
        isVisible = false; // Hide the opacity layer
        if (callback) {
          callback(); // Open the other menu after closing
        }
      }, 1000); // Wait for the closing animation to finish
    }
  }

  function handleTransitionEnd(event) {
    if (event?.propertyName === "opacity" && isClosing) {
      isClosing = false;
      isVisible = false;
    }
  }

  function openSlideshow(images, index, title) {
    slideshowImages = images;
    currentIndex = index; // Set the dynamic index from the event
    projectTitle = title;
    slideshowVisible = true;
    // console.log("Layout Opening slideshow at index:", currentIndex); // Debug
  }

  function handleOpenSlideshow(event) {
    // Open slideshow with event details
    openSlideshow(event.detail.images, event.detail.index, event.detail.title);
  }

  function closeSlideshow() {
    slideshowVisible = false;
  }
</script>

<!-- Controls -->
<nav
  class="mobile:h-[50px] fixed bottom-0 left-0 w-full flex justify-between px-[3rem] py-10 text-black bg-transparent mobile:fixed mobile:top-0 mobile:left-0 mobile:w-full mobile:flex mobile:justify-between mobile:items-center mobile:px-[1.5rem] mobile:py-[2.5rem] mobile:bg-white"
  style="z-index: 2001;"
>
  <div
    class="flex flex-col items-start text-[1.125rem] mobile:flex-row mobile:ml-0 ml-0 mobile:text-[1rem] mobile:gap-4"
    style="z-index: 2001;"
  >
    <button
      class="mb-2 hover:cursor-pointer toggle-menu-btn desktop:mb-2 mobile:mb-0"
      on:click={openWorkMenu}
      on:mouseenter={() => (hoverOnWork = true)}
      on:mouseleave={() => (hoverOnWork = false)}
      class:opacity-50={hoverOnContact || isAboutOpen}
    >
      work
    </button>
    <button
      class="mb-2 hover:cursor-pointer toggle-menu-btn desktop:mb-2 mobile:mb-0"
      on:click={openAboutMenu}
      on:mouseenter={() => (hoverOnContact = true)}
      on:mouseleave={() => (hoverOnContact = false)}
      class:opacity-50={hoverOnWork || isWorkOpen}
    >
      info
    </button>
  </div>
  <div
    class="mr-4 flex flex-col items-start justify-end mobile:flex-row mobile:items-center mobile:mr-0"
    style="z-index: 2001;"
  >
    <a
      href="/"
      class="kana-text-desktop text-[1.5rem] font-medium hover:cursor-pointer transition-colors duration-2000 ease-in-out hover:text-black toggle-menu-btn mobile:text-lg mobile:font-bold mobile:hidden"
      on:click={closeAll}
    >
      Kana Motojima
    </a>
  </div>
  <div
    class="kana-text hidden mobile:block fixed right-[-3rem] bottom-[6rem] text-lg font-bold z-2005 -rotate-90"
  >
    <a href="/" class="font-medium" on:click={closeAll}>Kana Motojima</a>
  </div>
</nav>

<!-- Overlay Container -->
<div
  class="overlay-container"
  style="z-index: {isWorkOpen || isAboutOpen || isClosing ? 2000 : 0};"
  on:openSlideshow={handleOpenSlideshow}
>
  <!-- Opacity Layer -->
  <OpacityLayer
    {isVisible}
    {isClosing}
    {isWhiteBackground}
    onClick={closeAll}
    on:transitionend={handleTransitionEnd}
  />

  <!-- Menus -->
  <WorkMenu
    {isWorkOpen}
    {isClosing}
    bind:isWhiteBackground
    onClose={closeAll}
    on:transitionend={handleTransitionEnd}
    on:openSlideshow={handleOpenSlideshow}
  />
  <AboutMenu
    {isAboutOpen}
    {isClosing}
    onClose={closeAll}
    on:transitionend={handleTransitionEnd}
  />
</div>

<!-- Slideshow Modal -->
{#if slideshowVisible}
  <div class="slideshow-wrapper">
    <SlideshowModal
      {slideshowImages}
      {currentIndex}
      {projectTitle}
      on:close={closeSlideshow}
    />
  </div>
{/if}

<!-- Slot for Homepage Content -->
<!-- <div
  bind:this={scrollContainer}
  id="scroll-container"
  style="position: relative;"
> -->
<slot />

<!-- </div> -->

<style>
  /* #scroll-container {
    position: relative;
    overflow: auto;
    min-height: 100vh; /* Ensures container starts with full viewport height */
  /* } */

  .overlay-container {
    position: relative;
  }

  .opacity-50 {
    opacity: 0.5;
  }
  .toggle-menu-btn {
    transition: opacity 300ms ease-in-out; /* Add the transition property here */
    mix-blend-mode: difference; /* Inverts the text color based on the background */
    color: #4c4c4c; /* Default color; will blend to the opposite on darker backgrounds */
  }

  .toggle-menu-btn:hover {
    color: black; /* Change color on hover */
    transition: opacity 300ms ease-in-out; /* Add the transition property here */
  }
  .kana-text a {
    color: #4c4c4c; /* Set initial color to black */
    mix-blend-mode: difference; /* This will invert the color based on the background */
    background: transparent; /* Ensure background is transparent */
    padding: 0.5rem; /* Optional: add padding for better visibility */
    border-radius: 5px; /* Optional: add border radius for aesthetics */
    white-space: nowrap; /* Ensure the text doesn't wrap */
    font-weight: bold !important;
    transition: color 300ms ease-in-out; /* Move transition to the default state */
  }

  .kana-text a:hover {
    color: black; /* Set hover color to black */
  }

  .kana-text-desktop {
    color: #4c4c4c;
    transition: color 300ms ease-in-out;
  }

  .kana-text-desktop:hover {
    color: black;
  }

  .slideshow-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99999;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: auto;
  }
</style>
