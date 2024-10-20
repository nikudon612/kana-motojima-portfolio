<script>
  import WorkMenu from "../components/navigation/workSlideOutMenu.svelte";
  import AboutMenu from "../components/navigation/aboutSlideOutMenu.svelte";
  import OpacityLayer from "../components/navigation/opacityLayer.svelte";

  let isWorkOpen = false;
  let isAboutOpen = false;
  let isClosing = false;

  function openWorkMenu() {
    isWorkOpen = true;
  }

  function openAboutMenu() {
    isAboutOpen = true;
  }

  function closeAll() {
    if (isWorkOpen || isAboutOpen) {
      isClosing = true;
      isWorkOpen = false;
      isAboutOpen = false;
    }
  }

  function handleTransitionEnd() {
    if (isClosing) {
      isClosing = false; // Reset state only after animations complete
    }
  }
</script>

<button on:click={openWorkMenu}>Open Work Menu</button>
<button on:click={openAboutMenu}>Open About Menu</button>

<!-- Overlay Container -->
<div
  class="overlay-container"
  style="z-index: {isWorkOpen || isAboutOpen || isClosing ? 2000 : 0};"
>
  <!-- Opacity Layer -->
  <OpacityLayer
    isVisible={isWorkOpen || isAboutOpen || isClosing}
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

<slot />

<style>
  .overlay-container {
    position: relative;
  }
</style>
