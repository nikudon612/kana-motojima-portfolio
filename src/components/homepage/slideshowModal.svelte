<script>
    import { createEventDispatcher, onMount } from "svelte";
  
    export let images = [];
    export let currentIndex = 0;
    const dispatch = createEventDispatcher();
    let cursor;
    let cursorText;
  
    function close() {
      dispatch("close");
    }
  
    function nextImage() {
      currentIndex = (currentIndex + 1) % images.length;
      updateCursorText();
    }
  
    function previousImage() {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateCursorText();
    }
  
    function updateCursorText() {
      cursorText.innerText = `${currentIndex + 1} / ${images.length}`;
    }
  
    onMount(() => {
      updateCursorText();
      document.addEventListener("mousemove", moveCursor);
      return () => {
        document.removeEventListener("mousemove", moveCursor);
      };
    });
  
    function moveCursor(e) {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
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
      <img
        src={images[currentIndex].imageUrl}
        alt={images[currentIndex].title}
        class="slideshow-image"
      />
    </div>
    <div class="nav-zone prev" on:click|stopPropagation={previousImage}></div>
    <div class="nav-zone next" on:click|stopPropagation={nextImage}></div>
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
      background-color: rgba(217, 217, 217, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2001;
      cursor: none; /* Hide the default cursor */
    }
  
    .slideshow {
      position: relative;
    }
  
    .slideshow-image {
      max-width: 90vw;
      max-height: 90vh;
    }
  
    .close-btn {
      position: fixed;
      top: 10px;
      right: 10px;
      margin-right: 2rem;
      background: none;
      border: none;
      font-size: 24px;
      /* cursor: pointer; */
      z-index: 1001;
    }
  
    .nav-zone {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 50%;
      /* cursor: pointer; */
    }
  
    .prev {
      left: 0;
    }
  
    .next {
      right: 0;
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
  