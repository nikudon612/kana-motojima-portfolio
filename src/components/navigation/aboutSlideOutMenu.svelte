<script>
  export let isAboutOpen = false;
  export let isClosing = false;
  export let onClose;

  function handleTransitionEnd(event) {
    console.log("Menu transition ended:", event.propertyName);
    if (event.propertyName === "transform" && isClosing) {
      dispatch("transitionend");
      console.log("Resetting isClosing state after slide-out transition");
    }
  }

  function closeMenu() {
    if (onClose) onClose();
  }
</script>

<div
  class={`menu-content ${isAboutOpen ? "slide-in" : "slide-out"}`}
  style="z-index: {isAboutOpen || isClosing
    ? 2000
    : 0}; pointer-events: {isAboutOpen ? 'auto' : 'none'};"
  on:click|stopPropagation
  on:transitionend={handleTransitionEnd}
>
  <div class="content">
    <!-- About Menu Content -->
    <p>About Menu Content</p>
  </div>
</div>

<style>
  .menu-content {
    position: fixed;
    top: 0;
    right: 0;
    width: 50%;
    height: 100%;
    background-color: white;
    transform: translateX(100%);
    transition: transform 1s ease;
  }

  .slide-in {
    transform: translateX(0);
  }

  .slide-out {
    transform: translateX(100%);
  }

  .content {
    padding: 2rem;
  }
</style>
