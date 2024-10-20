<script>
  import { createEventDispatcher } from "svelte";

  export let isVisible = false;
  export let onClick;

  const dispatch = createEventDispatcher();

  function handleClick() {
    if (onClick) onClick();
  }

  function handleTransitionEnd(event) {
    console.log("Opacity layer transition ended:", event?.propertyName, "Target:", event?.target);

    if (event?.propertyName === "opacity") {
      dispatch("transitionend");
    }
  }
</script>

<div
  class={`opacity-layer ${isVisible ? "fade-in" : "fade-out"}`}
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
    opacity: 0;  /* Start as transparent */
    pointer-events: none;
  }

  .fade-in {
    opacity: 1;
    pointer-events: auto;
  }

  .fade-out {
    opacity: 0;
  }
</style>
