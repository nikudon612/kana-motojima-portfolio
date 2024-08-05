<script>
  import { onMount } from "svelte";
  import { fetchAbout } from "../../lib/fetchSanityData"; // Adjust the path if necessary

  export let isOpen = false;
  export let isClosing = false;
  export let toggleMenu;

  let aboutData = null;
  let isFadingOut = false; // New state for fading out
  let showDarkLayer = false;
  let zIndexClass = ""; // Dynamic class for z-index

  function handleMenuLeftClick(event) {
    event.stopPropagation();
    if (isOpen) {
      closeMenu();
    }
  }

  function handleMenuRightClick(event) {
    event.stopPropagation();
  }

  function closeMenu() {
    isFadingOut = true; // Trigger fade out
    setTimeout(() => {
      isFadingOut = false;
      isClosing = false;
      isOpen = false;
      showDarkLayer = false;
      toggleMenu();
      zIndexClass = ""; // Reset z-index class
    }, 300); // Delay to match the fade out transition duration
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
      zIndexClass = "z-index-top"; // Apply z-index class when menu opens
    }, 0); // Adjust delay as needed
  } else if (typeof window !== "undefined" && !isOpen) {
    document.body.style.overflow = "";
    showDarkLayer = false;
  }
</script>

<div
  class={`fixed top-0 left-0 w-full h-full flex ${isOpen ? "" : "is-closing"} ${zIndexClass}`}
>
  {#if showDarkLayer || isFadingOut}
    <div
      class={`opacity-layer transition-opacity duration-300 cursor-pointer ${showDarkLayer && !isFadingOut ? "fade-in" : ""} ${isFadingOut ? "fade-out" : ""}`}
      on:click={handleMenuLeftClick}
    ></div>
  {/if}
  <div
    class="bg-white h-full flex items-center justify-center w-full desktop:w-[50%] desktop:absolute desktop:right-0 transform transition-transform duration-300"
    class:isOpen={isOpen}
    class:isClosing={isClosing}
    on:click|stopPropagation={handleMenuRightClick}
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
  @media (max-width: 767px) {
    .menu-left {
      display: none;
    }
    .menu-right {
      width: 100%;
      z-index: 999;
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

  .opacity-layer {
    background-color: rgba(0, 0, 0, 0);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* z-index: 1000; */
  }

  .opacity-layer.fade-in {
    animation: fadeIn 0.3s forwards; /* Synchronize with transition duration */
  }

  .opacity-layer.fade-out {
    animation: fadeOut 0.3s forwards; /* Synchronize with transition duration */
  }

  .transition-opacity {
    transition: background-color 0.3s ease-in-out; /* Ensure this matches the animation duration */
  }

  .is-closing .opacity-layer {
    display: none;
  }

  .isOpen {
    transform: translateX(0);
  }

  .isClosing {
    transform: translateX(100%);
  }

  .bg-white {
    transform: translateX(100%);
  }

  .bg-white.isOpen {
    transform: translateX(0);
  }

  .bg-white.isClosing {
    transform: translateX(100%);
  }

  .z-index-top {
    z-index: 1001; /* Higher z-index to ensure it appears above other elements */
  }

  @keyframes fadeIn {
    from {
      background-color: rgba(0, 0, 0, 0);
    }
    to {
      background-color: rgba(0, 0, 0, 0.6);
    }
  }

  @keyframes fadeOut {
    from {
      background-color: rgba(0, 0, 0, 0.6);
    }
    to {
      background-color: rgba(0, 0, 0, 0);
    }
  }
</style>
