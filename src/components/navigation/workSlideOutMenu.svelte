<script>
  import "../../app.css";
  import { createEventDispatcher } from "svelte";
  import { onMount } from "svelte";
  import { fetchProjects } from "../../lib/fetchSanityData";

  export let isWorkOpen = false;
  export let isClosing = false;

  const dispatch = createEventDispatcher();

  let works = [];
  let selectedWork = null;

  // Load projects when the component mounts
  onMount(async () => {
    await loadProjects();
  });

  async function loadProjects() {
    try {
      works = await fetchProjects();
      console.log("Projects loaded:", works); // Debugging to see if projects are loaded
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  }

  function handleTransitionEnd(event) {
    console.log("Menu transition ended:", event.propertyName);
    if (event.propertyName === "transform" && isClosing) {
      dispatch("transitionend");
      console.log("Resetting isClosing state after slide-out transition");
    }
  }
</script>

<!-- Menu Wrapper -->
<div
  class={`menu-content ${isWorkOpen ? (isClosing ? "slide-out" : "slide-in") : ""}`}
  style="z-index: {isWorkOpen || isClosing
    ? 2000
    : 0}; pointer-events: {isWorkOpen || isClosing ? 'auto' : 'none'};"
  on:click|stopPropagation
  on:transitionend={handleTransitionEnd}
>
  <!-- Menu Content -->
  <div class="menu">
    <div class="menu-left">
      <div class={`menu-content-list ${isWorkOpen ? "menu-open" : ""}`}>
        {#each works as work, index (work._id || index)}
          <p
            class="work-title hover:text-black"
            class:selected={selectedWork === work.title}
          >
            {work.title}
          </p>
        {/each}
      </div>
    </div>
  </div>
</div>

<style>
  .menu {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 3rem;
  }

  .menu-content {
    position: fixed;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    background-color: white;
    transform: translateX(-100%);
    transition: transform 1s cubic-bezier(0.25, 1, 0.5, 1);
  }

  .slide-in {
    transform: translateX(0);
  }

  .slide-out {
    transform: translateX(-100%);
  }

  .menu-content-list {
    /* padding: 2rem; */
  }

  .work-title {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    cursor: pointer;
    opacity: 0; /* Start with no opacity */
    transform: translate(50%, 0%); /* Start slightly offset */
    transition:
      opacity 1s cubic-bezier(0.25, 1, 0.5, 1),
      transform 1s cubic-bezier(0.25, 1, 0.5, 1); /* Transition for opacity and transform */
  }

  .menu-open .work-title {
    opacity: 1; /* Fade in */
    transform: translate(0%, 0%); /* Slide into position */
  }

  .hover\:text-black:hover {
    color: black;
  }
</style>
