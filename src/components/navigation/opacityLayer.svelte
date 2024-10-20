<script>
  import { createEventDispatcher } from "svelte";

  export let isVisible = false;
  const dispatch = createEventDispatcher();

  function handleClick() {
    dispatch("close"); // Dispatches 'close' event to trigger closing
  }

  function handleTransitionEnd(event) {
    if (event.propertyName === "opacity") {
      dispatch("transitionend");
    }
  }
</script>

<div
  class={`opacity-layer ${isVisible ? "visible" : "hidden"}`}
  on:click={handleClick}
  on:transitionend={handleTransitionEnd}
></div>

<style>
  .opacity-layer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 2000;
    transition: opacity 1s ease;
    opacity: 0;
    pointer-events: none;
  }

  .visible {
    opacity: 1;
    pointer-events: auto;
  }

  .hidden {
    opacity: 0;
  }
</style>
