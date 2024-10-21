<script>
  import WorkMenu from "../components/navigation/workSlideOutMenu.svelte";
  import AboutMenu from "../components/navigation/aboutSlideOutMenu.svelte";
  import OpacityLayer from "../components/navigation/opacityLayer.svelte";

  let isWorkOpen = false;
  let isAboutOpen = false;
  let isClosing = false;
  let isVisible = false;

  function openWorkMenu() {
    isVisible = true;  // Opacity layer needs to be visible
    isWorkOpen = true;
  }

  function openAboutMenu() {
    isVisible = true;  // Opacity layer needs to be visible
    isAboutOpen = true;
  }

  function closeAll() {
    if (isWorkOpen || isAboutOpen) {
      isClosing = true; // Start closing animation
      isWorkOpen = false;
      isAboutOpen = false;
    }
  }

  function handleTransitionEnd(event) {
    if (event?.propertyName === "opacity" && isClosing) {
      // Once the fade-out is done, fully hide the layer
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
