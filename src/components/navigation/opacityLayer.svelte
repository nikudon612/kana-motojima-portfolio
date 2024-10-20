<script>
  import { createEventDispatcher } from "svelte";

  export let isVisible = false;
  export let onClick;

  const dispatch = createEventDispatcher();

  function handleClick() {
    if (onClick) onClick(); // Ensure close function triggers
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
    transition: opacity 1s ease; /* Ensure smooth fade */
    opacity: 0; /* Start as transparent */
    pointer-events: none; /* Disable clicks when hidden */
  }

  .visible {
    opacity: 1;
    pointer-events: auto; /* Enable clicks when visible */
  }

  .hidden {
    opacity: 0;
  }
</style>
