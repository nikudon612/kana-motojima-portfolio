<script>
  import { onMount } from "svelte";
  import { fetchAbout } from "../../lib/fetchSanityData";

  export let isOpen = false;
  export let toggleMenu;
  export let isClosing;

  let aboutData = null;
  let isFadingOut = false;
  let showDarkLayer = false;
  let zIndexClass = "";

  function handleMenuLeftClick(event) {
    event.stopPropagation();
    if (isOpen) {
      closeMenu();
    }
  }

  function handleMenuContentClick(event) {
    event.stopPropagation();
  }

  function closeMenu() {
    isFadingOut = true;
    setTimeout(() => {
      isFadingOut = false;
      isOpen = false;
      showDarkLayer = false;
      toggleMenu();
      zIndexClass = "";
    }, 300); // Reduce this duration to match the transition duration
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
      zIndexClass = "z-index-top";
    }, 0);
  } else if (typeof window !== "undefined" && !isOpen && !isFadingOut) {
    document.body.style.overflow = "";
    showDarkLayer = false;
  }
</script>

<div
  class={`fixed top-0 left-0 w-full h-full flex ${isOpen || isFadingOut ? "" : "is-closing"} ${zIndexClass}`}
>
  {#if isOpen || isFadingOut}
    <div
      class={`opacity-layer transition-opacity duration-300 cursor-pointer ${showDarkLayer && !isFadingOut ? "fade-in" : ""} ${isFadingOut ? "fade-out" : ""}`}
      on:click={handleMenuLeftClick}
    ></div>
  {/if}
  <div
    class={`bg-white h-full flex items-center justify-center w-full desktop:w-[50%] desktop:absolute desktop:right-0 transform transition-transform duration-300 ${isOpen || isFadingOut ? "isOpen" : "isClosing"}`}
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

  .transition-opacity {
    transition: background-color 0.3s ease-in-out;
  }

  .isOpen {
    transform: translateX(0);
  }

  .isClosing {
    transform: translateX(100%);
  }

  .z-index-top {
    z-index: 1001; /* Ensure it is above other content */
  }

  .bg-white {
    transform: translateX(100%);
    transition:
      transform 0.3s ease-in-out,
      background-color 0.3s ease-in-out;
  }

  .bg-white.isOpen {
    transform: translateX(0);
  }

  .bg-white.isClosing {
    transform: translateX(100%);
  }

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
