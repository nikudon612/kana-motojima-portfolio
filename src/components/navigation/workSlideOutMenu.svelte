<script>
  import { createEventDispatcher } from "svelte";

  export let isWorkOpen = false;
  export let isClosing = false;
  export let onClose;

  const dispatch = createEventDispatcher();

  function handleTransitionEnd(event) {
    if (event.propertyName === "transform") {
      dispatch("transitionend");
    }
  }
</script>

<div
  class={`menu-content ${isWorkOpen ? "slide-in" : isClosing ? "slide-out" : ""}`}
  style="z-index: {isWorkOpen || isClosing ? 2000 : 0}; pointer-events: {isWorkOpen || isClosing ? 'auto' : 'none'};"
  on:click|stopPropagation
  on:transitionend={handleTransitionEnd}
>
  <div class="content">
    <!-- Work Menu Content -->
    <p>Work Menu Content</p>
  </div>
</div>

<style>
  .menu-content {
    position: fixed;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    background-color: white;
    transform: translateX(-100%);
    transition: transform 1s ease; /* Matches opacity layer duration */
  }

  .slide-in {
    transform: translateX(0);
  }

  .slide-out {
    transform: translateX(-100%);
  }

  .content {
    padding: 2rem;
  }
</style>
