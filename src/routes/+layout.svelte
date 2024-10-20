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
    console.log("Closing all menus");
    if (isWorkOpen || isAboutOpen) {
      isClosing = true; // Start closing immediately
      isWorkOpen = false;
      isAboutOpen = false;
    }
  }

  function handleTransitionEnd(event) {
    console.log(
      "Transition ended:",
      event?.propertyName,
      "Target:",
      event?.target
    );

    if (
      isClosing &&
      (event?.propertyName === "opacity" || event?.propertyName === "transform")
    ) {
      console.log("Resetting isClosing state");
      isClosing = false; // Reset state after both transitions complete
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

<!-- Slot for Homepage Content -->
<slot />

<style>
  .overlay-container {
    position: relative;
  }
</style>
