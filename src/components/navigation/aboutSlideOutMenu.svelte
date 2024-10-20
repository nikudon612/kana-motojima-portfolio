<script>
  import { onMount } from "svelte";
  import { fetchAbout } from "../../lib/fetchSanityData";

  export let isOpen = false;
  export let toggleMenu;
  export let isFadingOut = false;

  let aboutData = null;
  let layerOpacity = 0;
  let layerBackground = "rgba(0, 0, 0, 0)";
  let zIndexClass = "";
  const transitionDuration = 1000; // Match duration with Work menu

  function handleMenuLeftClick(event) {
    if (event.target.classList.contains("opacity-layer") && layerOpacity > 0) {
      closeMenu();
    }
  }

  function handleMenuContentClick(event) {
    event.stopPropagation();
  }

  function openMenu() {
    layerOpacity = 0;
    layerBackground = "rgba(0, 0, 0, 0)";
    zIndexClass = "z-index-top";

    setTimeout(() => {
      layerOpacity = 1;
      layerBackground = "rgba(0, 0, 0, 0.6)";
    }, 50); // Small delay to ensure smooth animation
  }

  function closeMenu() {
    isFadingOut = true;

    // Start simultaneous fade-out and slide-out
    setTimeout(() => {
      layerOpacity = 0;
      layerBackground = "rgba(0, 0, 0, 0)";

      setTimeout(() => {
        isFadingOut = false;
        isOpen = false;
        toggleMenu();
        zIndexClass = "";
      }, transitionDuration);
    }, 0);
  }

  onMount(async () => {
    try {
      aboutData = await fetchAbout();
    } catch (error) {
      console.error("Failed to fetch data from Sanity:", error);
    }
  });

  $: if (isOpen && !isFadingOut) {
    openMenu();
  }
</script>

<div
  class={`fixed top-0 left-0 w-full h-full flex ${isOpen || isFadingOut ? "" : "is-closing"} ${zIndexClass}`}
>
  {#if isOpen || isFadingOut}
    <div
      class="opacity-layer {layerOpacity > 0 ? 'show' : ''}"
      style="opacity: {layerOpacity}; background-color: {layerBackground}; transition: opacity {transitionDuration}ms cubic-bezier(0.25, 1, 0.5, 1), background-color {transitionDuration}ms cubic-bezier(0.25, 1, 0.5, 1);"
      on:click={handleMenuLeftClick}
    ></div>
  {/if}

  <div
    class={`bg-white h-full flex items-center justify-center w-full desktop:w-[50%] desktop:absolute desktop:right-0 transform transition-transform duration-${transitionDuration}ms cubic-bezier(0.25, 1, 0.5, 1) ${isOpen ? "menu-open" : "menu-close"}`}
    on:click={handleMenuContentClick}
  >
    <div class="text-left mobile:px-[1.5rem] px-[3rem] desktop:max-w-[60%]">
      {#if aboutData}
        <div>
          <p class="mb-4">{aboutData.bio}</p>
          <p class="mb-4">Bilingual in Japanese and English.</p>
          <p class="mb-4">
            For all inquiries, please email {aboutData.contactInfo}
          </p>
        </div>
        <div class="mt-16">
          <h2 class="mobile:text-m desktop:text-lg">Select Clients:</h2>
          <ul>
            {#each aboutData.selectClients as client}
              <li>{client}</li>
            {/each}
          </ul>
        </div>
      {:else}
        <p>Loading...</p>
      {/if}
    </div>
  </div>
</div>

<style>
  .menu-open {
    transform: translateX(0);
  }

  .menu-close {
    transform: translateX(100%);
  }

  .opacity-layer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    pointer-events: none; /* Allow clicks through when invisible */
    transition:
      opacity 1s cubic-bezier(0.25, 1, 0.5, 1),
      background-color 1s cubic-bezier(0.25, 1, 0.5, 1);
  }

  .opacity-layer.show {
    pointer-events: auto; /* Intercept clicks when visible */
  }

  .bg-white {
    transition: transform 1s cubic-bezier(0.25, 1, 0.5, 1);
    z-index: 1001;
  }

  .z-index-top {
    z-index: 1001;
  }
</style>
