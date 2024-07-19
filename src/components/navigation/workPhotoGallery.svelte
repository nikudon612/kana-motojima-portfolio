<script>
    export let currentPhotos = [];
    export let close;
  
    function handleClose(event) {
      event.stopPropagation(); // Prevent click from closing menu
      close(); // Emit close event to parent
    }
  </script>
  
  <div class="modal-overlay" on:click={handleClose}>
    <div class="modal-content" on:click|stopPropagation>
      {#each currentPhotos as photo, index}
        <img src={photo.url} alt="Project photo" class="gallery-photo photo-{index}" />
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
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1999;
    }
  
    .modal-content {
      position: relative;
      width: 80%;
      height: 80%;
      background-color: transparent;
      display: flex;
      flex-wrap: wrap;
      overflow: auto;
    }
  
    .gallery-photo {
      margin: 10px;
      max-width: 100%;
      max-height: 100%;
      object-fit: cover;
    }
  </style>
  