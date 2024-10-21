<script>
  export let isAboutOpen = false;
  export let isClosing = false;
  export let onClose;
  import { onMount } from "svelte";
  import { fetchAbout } from "../../lib/fetchSanityData";
  let aboutData = null;

  onMount(async () => {
    try {
      aboutData = await fetchAbout();
    } catch (error) {
      console.error("Failed to fetch data from Sanity:", error);
    }
  });

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
  <div class="flex items-center h-full">
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
