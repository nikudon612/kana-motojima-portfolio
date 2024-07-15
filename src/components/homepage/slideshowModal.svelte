<script>
  import { createEventDispatcher } from "svelte";

  export let images = [];
  export let currentIndex = 0;
  const dispatch = createEventDispatcher();

  function close() {
    dispatch("close");
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
  }

  function previousImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
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
    z-index: 1000;
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
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    z-index: 1001;
  }

  .nav-zone {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 50%;
    cursor: pointer;
  }

  .prev {
    left: 0;
  }

  .next {
    right: 0;
  }
</style>
