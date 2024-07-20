<script>
    import { createEventDispatcher, onMount } from "svelte";
  
    export let slideshowImages = []; // Ensure this is passed as a prop
    export let currentIndex = 0;
    const dispatch = createEventDispatcher();
    let cursor;
    let cursorText;
  
    function close() {
      dispatch("close");
    }
  
    function nextImage() {
      currentIndex = (currentIndex + 1) % slideshowImages.length;
      updateCursorText();
    }
  
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
  </script>
  
  <div class="modal" on:click={close}>
    <button
      class="close-btn"
      on:click={(e) => {
        e.stopPropagation();
        close();
      }}>✕</button
    >
  
    <div class="slideshow" on:click|stopPropagation>
      {#if slideshowImages.length > 0}
        <img
          src={slideshowImages[currentIndex].imageUrl}
          alt={slideshowImages[currentIndex].title}
          class="slideshow-image"
        />
        <!-- <div class="image-count">{currentIndex + 1}/{slideshowImages.length}</div> -->
      {/if}
    </div>
    <div class="nav-zone prev" on:click|stopPropagation={previousImage}></div>
    <div class="nav-zone next" on:click|stopPropagation={nextImage}></div>
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
  
  <div class="custom-cursor" bind:this={cursor}>
    <div class="cursor-circle"></div>
    <div class="cursor-text" bind:this={cursorText}></div>
  </div>
  
  <style>
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
      z-index: 2000; /* Lower z-index to make navbar visible */
      cursor: none; /* Hide the default cursor */
    }
  
    .slideshow {
      position: relative;
      top: var(--navbar-height); /* Start below the navbar */
      height: calc(100% - var(--navbar-height)); /* Full height minus navbar */
      z-index: 2001; /* Ensure content is above modal background */
      display: flex;
      align-items: center;
      justify-content: center;
      padding-bottom: 6rem;
      padding-top: 2rem;
    }
  
    .slideshow-image {
      max-width: 60vw;
      max-height: 60vh;
    }
  
    .close-btn {
      position: fixed;
      top: 10px;
      right: 10px;
      margin-right: 2rem;
      background: none;
      border: none;
      font-size: 24px;
      z-index: 2002;
    }
  
    .nav-zone {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 50%;
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
      bottom: 150px;
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
      z-index: 2002;
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
  