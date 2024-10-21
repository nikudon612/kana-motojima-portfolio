<script>
  import WorkMenu from "../components/navigation/workSlideOutMenu.svelte";
  import AboutMenu from "../components/navigation/aboutSlideOutMenu.svelte";
  import OpacityLayer from "../components/navigation/opacityLayer.svelte";

  let isWorkOpen = false;
  let isAboutOpen = false;
  let isClosing = false;
  let isVisible = false;

  function openWorkMenu() {
    if (isAboutOpen) {
      // Close About Menu if it's open, then open Work Menu
      closeAll(() => {
        isWorkOpen = true;
        isVisible = true;
      });
    } else {
      isVisible = true; // Ensure opacity layer is visible
      isWorkOpen = true;
    }
  }

  function openAboutMenu() {
    if (isWorkOpen) {
      // Close Work Menu if it's open, then open About Menu
      closeAll(() => {
        isAboutOpen = true;
        isVisible = true;
      });
    } else {
      isVisible = true; // Ensure opacity layer is visible
      isAboutOpen = true;
    }
  }

  function closeAll(callback) {
    if (isWorkOpen || isAboutOpen) {
      isClosing = true; // Start closing animation
      isWorkOpen = false;
      isAboutOpen = false;

      setTimeout(() => {
        isClosing = false;
        if (callback) {
          callback(); // Open the other menu after closing
        } else {
          isVisible = false; // Hide the opacity layer if no other menu opens
        }
      }, 1000); // Wait for the closing animation to finish
    }
  }

  function handleTransitionEnd(event) {
    if (event?.propertyName === "opacity" && isClosing) {
      // Ensure the closing state is reset properly
      isClosing = false;
      isVisible = false;
    }
  }
</script>

<!-- Controls -->
<button on:click={openWorkMenu}>Open Work Menu</button>
<button on:click={openAboutMenu}>Open About Menu</button>

<!-- Overlay Container -->
<div
  class="overlay-container"
  style="z-index: {isWorkOpen || isAboutOpen || isClosing ? 2000 : 0};"
>
  <!-- Opacity Layer -->
  <OpacityLayer
    {isVisible}
    {isClosing}
    onClick={closeAll}
    on:transitionend={handleTransitionEnd}
  />

  <!-- Menus -->
  <WorkMenu
    {isWorkOpen}
    {isClosing}
    onClose={closeAll}
    on:transitionend={handleTransitionEnd}
  />
  <AboutMenu
    {isAboutOpen}
    {isClosing}
    onClose={closeAll}
    on:transitionend={handleTransitionEnd}
  />
</div>

<!-- Slot for Homepage Content -->
<slot />

<style>
  .overlay-container {
    position: relative;
  }
</style>
