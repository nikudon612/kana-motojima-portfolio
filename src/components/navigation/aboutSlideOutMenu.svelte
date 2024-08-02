<script>
  import { onMount } from "svelte";
  import { fetchAbout } from "../../lib/fetchSanityData"; // Adjust the path if necessary

  export let isOpen = false;
  export let isClosing = false;
  export let toggleMenu;

  let aboutData = null;
  let showDarkLayer = false;

  function handleMenuLeftClick(event) {
    event.stopPropagation();
    if (isOpen) {
      closeMenu();
    }
  }

  function closeMenu() {
    isClosing = true;
    setTimeout(() => {
      isClosing = false;
      isOpen = false;
      showDarkLayer = false;
      toggleMenu();
    }, 300); // Delay to match the fade-out transition duration
  }

  onMount(async () => {
    try {
      const data = await fetchAbout();
      aboutData = data;
    } catch (error) {
      console.error("Failed to fetch data from Sanity:", error);
    }
  });

  $: if (typeof window !== "undefined" && isOpen) {
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      showDarkLayer = true;
    }, 0); // Adjust delay as needed
  } else if (typeof window !== "undefined" && !isOpen) {
    document.body.style.overflow = "";
    showDarkLayer = false;
  }
</script>

<div
  class={`fixed top-0 left-0 w-full h-full flex z-[1000] ${isOpen ? "is-open" : "is-closing"}`}
>
  <div
    class={`opacity-layer transition-opacity duration-300 cursor-pointer ${showDarkLayer ? "fade-in" : "fade-out"}`}
    on:click={handleMenuLeftClick}
  ></div>
  <div
    class="bg-white h-full w-full flex items-center justify-center desktop:w-[50%] desktop:absolute desktop:right-0 transition-transform duration-300"
    class:open={isOpen}
    class:close={!isOpen}
    on:click|stopPropagation
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
  .opacity-layer {
    background-color: rgba(0, 0, 0, 0);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: background-color 0.3s ease-in-out;
  }

  .opacity-layer.fade-in {
    background-color: rgba(0, 0, 0, 0.6);
  }

  .opacity-layer.fade-out {
    background-color: rgba(0, 0, 0, 0);
  }

  .bg-white {
    transform: translateX(100%);
  }

  .bg-white.open {
    transform: translateX(0);
  }

  .bg-white.close {
    transform: translateX(100%);
  }

  .is-open {
    transition: transform 0.3s ease-in-out;
  }

  .is-closing {
    transition: transform 0.3s ease-in-out;
  }

  @media (max-width: 768px) {
    .menu-left {
      display: none;
    }
    .menu-right {
      width: 100%;
    }
  }

  @media (min-width: 768px) {
    .menu-left {
      display: flex;
    }
    .menu-right {
      width: auto;
    }
  }

  .menu-content p {
    margin-bottom: 1em;
    cursor: pointer;
    transition: color 0.3s ease-in-out;
  }

  .menu-content p.selected {
    color: black;
    font-weight: bold;
  }

  .menu-content p:not(.selected) {
    color: grey;
  }
</style>
