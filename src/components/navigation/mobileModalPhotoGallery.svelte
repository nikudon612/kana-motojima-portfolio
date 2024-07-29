<script>
  import { fade } from "svelte/transition";

  export let projectTitle;
  // console.log(projectTitle);
  export let currentPhotos = [];

  export let close; // Ensure this is passed as a prop
  export let isClosing = false;

  let currentIndex = 0;

  function handleClose(event) {
    event.stopPropagation(); // Prevent click from closing menu
    if (typeof close === "function") {
      close(); // Emit close event to parent
    }
  }

  function nextPhoto() {
    currentIndex = (currentIndex + 1) % currentPhotos.length;
  }

  function prevPhoto() {
    currentIndex =
      (currentIndex - 1 + currentPhotos.length) % currentPhotos.length;
  }

  function handlePhotoClick(event) {
    const halfWidth = event.currentTarget.offsetWidth / 2;
    if (event.clientX > halfWidth) {
      nextPhoto();
    } else {
      prevPhoto();
    }
  }
</script>

<div
  class="fixed top-[6rem] inset-0 bg-white z-[2000] {isClosing
    ? 'opacity-0'
    : 'opacity-100'} transition-opacity duration-300"
  on:click={handleClose}
>
  <div
    class="relative w-full h-full max-h-full bg-white overflow-hidden px-[2rem] box-border pt-20 pb-20 flex flex-col justify-between"
    on:click|stopPropagation
  >
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-m font-bold">{projectTitle}</h2>
      <button class="text-2xl" on:click={handleClose}>&times;</button>
    </div>
    <div
      class="flex-1 flex items-center justify-center"
      on:click={handlePhotoClick}
    >
      <img
        src={currentPhotos[currentIndex].url}
        alt="Project photo"
        class="max-w-[65vw] max-h-full object-contain transition-opacity duration-300"
        transition:fade
      />
    </div>
    <div class="text-center text-lg font-bold mb-2">
      {currentIndex + 1} / {currentPhotos.length}
    </div>
    <div class="text-center mb-4">
      {#each Array(currentPhotos.length) as _, i}
        <span
          class="cursor-pointer mx-1 text-xl {i === currentIndex
            ? 'text-black'
            : 'text-gray-400'}"
          on:click={() => (currentIndex = i)}>&bull;</span
        >
      {/each}
    </div>
  </div>
</div>
