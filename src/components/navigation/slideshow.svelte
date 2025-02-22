<script>
  import { tick } from "svelte";
  export let slideshowImages = [];
  export let currentIndex = 0; // Initial index for the slideshow
  export let projectTitle; // The project title for the slideshow

  import { createEventDispatcher, onMount } from "svelte";

  let cursor;
  let cursorText;

  const dispatch = createEventDispatcher();

  function close() {
    dispatch("close");
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % slideshowImages.length;
    tick().then(updateCursorText); // Ensure state update before modifying cursorText
  }

  function previousImage() {
    currentIndex =
      (currentIndex - 1 + slideshowImages.length) % slideshowImages.length;
    tick().then(updateCursorText);
  }

  function updateCursorText() {
    if (cursorText) {
      cursorText.innerText = `${currentIndex + 1} / ${slideshowImages.length}`;
    }
  }

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
  <div
    class="content z-[10000]"
    on:click|stopPropagation={(e) => {
      if (e.clientX < window.innerWidth / 2) {
        previousImage();
      } else {
        nextImage();
      }
    }}
  >
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
    </div>

    <div class="nav-dots">
      {#each slideshowImages as _, index}
        <div class="nav-dot" class:active={index === currentIndex}></div>
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
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(217, 217, 217, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: relative;
  }

  .title-container {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    z-index: 10001;
  }

  .close-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 0 0.5rem;
    font-size: 1.5rem;
    opacity: 0.5;
    transition: opacity 0.3s ease;
    cursor: pointer;
  }

  .slideshow-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    width: 100%;
    padding-top: 4rem;
    padding-bottom: 6rem;
  }

  .slideshow {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
  }

  .slideshow-image {
    max-width: 80vw;
    max-height: 80vh;
    user-select: none; /* Prevent accidental text/image selection */
    -webkit-user-drag: none; /* Prevent dragging behavior */
  }

  .close-btn:hover {
    opacity: 1;
  }

  .nav-dots {
    position: absolute;
    bottom: 4rem;
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
    margin-left: 8px;
    color: black;
    font-size: 12px;
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    .title-container {
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      gap: 1rem;
    }

    .close-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      padding: 0 0.5rem;
      font-size: 1.5rem;
      cursor: pointer;
    }
  }
</style>
