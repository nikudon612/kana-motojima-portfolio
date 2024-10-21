<script>
  import { createEventDispatcher } from "svelte";

  export let isWorkOpen = false;
  export let isClosing = false;

  const dispatch = createEventDispatcher();

  function handleTransitionEnd(event) {
    console.log("Menu transition ended:", event.propertyName);
    if (event.propertyName === "transform" && isClosing) {
      dispatch("transitionend");
      console.log("Resetting isClosing state after slide-out transition");
    }
  }
</script>

<div
  class={`menu-content ${isWorkOpen ? (isClosing ? "slide-out" : "slide-in") : ""}`}
  style="z-index: {isWorkOpen || isClosing
    ? 2000
    : 0}; pointer-events: {isWorkOpen || isClosing ? 'auto' : 'none'};"
  on:click|stopPropagation
  on:transitionend={handleTransitionEnd}
>
  <div class="content">
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
    transition: transform 1s ease;
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
