<script>
  export let currentPhotos = [];
  export let close;

  function handleClose(event) {
    event.stopPropagation(); // Prevent click from closing menu
    close(); // Emit close event to parent
  }
</script>

<div class="modal-overlay" on:click={handleClose}>
  <div class="modal-content">
    {#each currentPhotos as photo, index}
      <img src={photo.url} alt="Project photo" class="gallery-photo" style="top: {photo.Work_Y}%; left: {photo.Work_X}%" />
    {/each}
  </div>
</div>

<style>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
    z-index: 1000;
    pointer-events: none; /* Ensure the overlay does not block clicks */
  }

  .modal-content {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: transparent;
    pointer-events: none; /* Ensure the modal content does not block clicks */
  }

  .gallery-photo {
    position: absolute;
    object-fit: cover;
    transform: translate(-50%, -50%); /* Center the images at the given coordinates */
    max-width: 250px; /* Maximum width of 250px */
    width: 100%; /* Ensure images resize correctly within the max width */
    pointer-events: auto; /* Allow interaction with the images */
  }
</style>
