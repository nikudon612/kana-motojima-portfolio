<script>
  export let slideshowImages = [];
  export let currentIndex = 0; // Initial index for the slideshow
  export let projectTitle; // The project title for the slideshow
  // export let firstImageOfProject; // The first image of the project
  import { createEventDispatcher, onMount } from "svelte"; // Ensure it's imported

  let cursor;
  let cursorText;

  const dispatch = createEventDispatcher();

  function close() {
    dispatch("close");
  }

  // Move to the next image
  function nextImage() {
    currentIndex = (currentIndex + 1) % slideshowImages.length;
    updateCursorText();
  }

  // Move to the previous image
  function previousImage() {
    currentIndex =
      (currentIndex - 1 + slideshowImages.length) % slideshowImages.length;
    updateCursorText();
  }

  function updateCursorText() {
    if (cursorText) {
      cursorText.innerText = `${currentIndex + 1} / ${slideshowImages.length}`;
    }
  }

  // On mount, if there's a first image, set it as the current image
  // onMount(() => {
  //   if (firstImageOfProject) {
  //     slideshowImages = [{ url: firstImageOfProject }, ...slideshowImages];
  //   }
  // });

  onMount(() => {
    updateCursorText();
    document.addEventListener("mousemove", moveCursor);
    return () => {
      document.removeEventListener("mousemove", moveCursor);
    };
  });

  function moveCursor(e) {
    if (cursor) {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    }
  }

  function handleMouseEnterClose() {
    cursor.style.display = "none";
  }

  function handleMouseLeaveClose() {
    cursor.style.display = "flex";
  }
</script>

<div
  class="modal z-[10000]"
  on:click={(e) => {
    e.stopPropagation();
    close();
  }}
>
  <div class="content z-[10000]" on:click|stopPropagation>
    <div class="title-container px-[3rem]">
      {projectTitle}
      <button
        class="close-btn z-[10000]"
        on:mouseenter={handleMouseEnterClose}
        on:mouseleave={handleMouseLeaveClose}
        on:click={(e) => {
          e.stopPropagation();
          close();
        }}>✕</button
      >
    </div>
    <div class="slideshow-container">
      <div class="slideshow">
        {#if slideshowImages.length > 0}
          <img
            src={slideshowImages[currentIndex].url}
            alt={slideshowImages[currentIndex].title}
            class="slideshow-image"
          />
        {/if}
      </div>
      <div class="nav-zone prev" on:click|stopPropagation={previousImage}></div>
      <div class="nav-zone next" on:click|stopPropagation={nextImage}></div>
    </div>
    <div class="nav-dots">
      {#each slideshowImages as _, index}
        <div
          class="nav-dot {index === currentIndex ? 'active' : ''}"
          on:click={() => {
            currentIndex = index;
            updateCursorText();
          }}
        ></div>
      {/each}
    </div>
  </div>
</div>

<div class="custom-cursor z-[10000]" bind:this={cursor}>
  <div class="cursor-circle"></div>
  <div class="cursor-text" bind:this={cursorText}></div>
</div>

<style>
  .modal,
  .content {
    cursor: none; /* Hide the default cursor */
  }

  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: white; /* Semi-transparent background */
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;

    @media (max-width: 768px) {
      display: none;
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .title-container {
    width: 100%;
    text-align: left;
    font-size: 1rem;
    padding-bottom: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: start;
  }

  .slideshow-container {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 2rem;
    padding-bottom: 6rem;
  }

  .slideshow {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000; /* Ensure content is above modal background */
  }

  .slideshow-image {
    max-width: 60vw;
    max-height: 60vh;
  }

  .close-btn {
    /* position: fixed; */
    display: flex;
    align-items: flex-start;
    background: none;
    border: none;
    font-size: 24px;
    opacity: 0.5; /* Set initial opacity to 50% */
    z-index: 10000;
    transition: opacity 0.3s ease; /* Smooth transition */
    padding: 0.5rem;
    padding-top: 0rem;
    cursor: pointer; /* Show the default cursor */
  }

  .close-btn:hover {
    opacity: 1; /* Fully visible on hover */
  }

  .nav-zone {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 50%;
    cursor: none;
  }

  .prev {
    left: 0;
  }

  .next {
    right: 0;
  }

  .image-count {
    position: absolute;
    bottom: 10px;
    right: 10px;
    color: black;
    font-size: 16px;
    background: rgba(255, 255, 255, 0.8);
    padding: 5px 10px;
    border-radius: 3px;
  }

  .nav-dots {
    position: absolute;
    bottom: 125px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 5px;
  }

  .nav-dot {
    width: 10px;
    height: 10px;
    background: black;
    border-radius: 50%;
    cursor: pointer;
  }

  .nav-dot.active {
    background: gray;
  }

  .custom-cursor {
    position: fixed;
    display: flex;
    align-items: center;
    pointer-events: none;
    z-index: 10000;
    transform: translate(-50%, -50%);
  }

  .cursor-circle {
    width: 12px;
    height: 12px;
    background-color: black;
    border-radius: 50%;
  }

  .cursor-text {
    margin-left: 8px; /* Space between the circle and the text */
    color: black;
    font-size: 12px;
    white-space: nowrap;
  }
</style>
