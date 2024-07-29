<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { fetchAbout } from "../../lib/fetchSanityData"; // Adjust the path if necessary

  export let isOpen = false;
  export let isClosing = false;
  export let toggleMenu;

  let menuLeftVisible = true;
  let aboutData = null;
  let showDarkLayer = false;

  function handleMenuLeftClick(event) {
    event.stopPropagation();
    if (isOpen) {
      toggleMenu(event);
    }
  }

  function handleMenuRightClick(event) {
    event.stopPropagation();
  }

  function handleLeftFadeOut() {
    menuLeftVisible = false;
    setTimeout(() => {
      isClosing = true;
    }, 300);
  }

  onMount(async () => {
    try {
      const data = await fetchAbout();
      aboutData = data;
      // console.log("About data fetched:", data);
    } catch (error) {
      console.error("Failed to fetch data from Sanity:", error);
    }

    $: if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        showDarkLayer = true;
      }, 300); // Adjust delay as needed
    } else {
      document.body.style.overflow = "";
      showDarkLayer = false;
    }
  });

  $: if (typeof window !== "undefined" && isOpen) {
    document.body.style.overflow = "hidden";
  } else if (typeof window !== "undefined" && !isOpen) {
    document.body.style.overflow = "";
  }
</script>

<div
  class={`fixed top-0 left-0 w-full h-full flex z-[1000] transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"} ${isClosing ? "transition-delay-[300ms]" : ""}`}
>
  {#if menuLeftVisible}
    <div
      class={`flex-1 bg-black bg-opacity-50 transition-colors duration-300 cursor-pointer ${showDarkLayer ? "bg-black/60" : ""} hidden desktop:block`}
      on:click={handleMenuLeftClick}
      transition:fade={{ duration: 300 }}
      on:out={handleLeftFadeOut}
    ></div>
  {/if}
  <div
    class="flex-1 bg-white flex items-center justify-center w-full desktop:w-[40%]"
  >
    <div class="text-left mobile:px-[1.5rem] px-[3rem] desktop:max-w-[60%]">
      {#if aboutData}
        <!-- <img src={aboutData.profileImageUrl} alt={aboutData.name} class="mb-4 rounded-full w-32 h-32 object-cover"/> -->
        <!-- <PortableText value={aboutData.bio} /> -->
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
</style>
