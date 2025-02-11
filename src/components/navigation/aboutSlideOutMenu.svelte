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
  <div class="flex items-center h-full w-full">
    <div class="text-left mobile:px-[1.5rem] px-[3rem] desktop:max-w-[60%]">
      {#if aboutData}
        <div class={`about-content-list ${isAboutOpen ? "menu-open" : ""}`}>
          <p class="about-title mb-4">{aboutData.bio}</p>
          <p class="about-title mb-4">Bilingual in Japanese and English.</p>
          <p class="about-title mb-4">
            For all inquiries, please email
            <a href="mailto:{aboutData.contactInfo}" class="email-link">
              {aboutData.contactInfo}
              <span class="underline"></span>
            </a>
          </p>

          <div class="mt-16">
            <h2 class="mobile:text-m desktop:text-lg about-title">
              Select Clients:
            </h2>
            <ul>
              {#each aboutData.selectClients as client}
                <li class="about-title clients">{client}</li>
              {/each}
            </ul>
          </div>
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

  @media (max-width: 768px) {
    .menu-content {
      width: 100%;
    }
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

  /* Animation for About Menu Titles */
  .about-title {
    font-size: 1rem;
    cursor: default;
    opacity: 0; /* Start with no opacity */
    transform: translate(50%, 0%); /* Start slightly offset */
    transition:
      opacity 1.4s cubic-bezier(0.25, 1, 0.5, 1),
      transform 1.4s cubic-bezier(0.25, 1, 0.5, 1); /* Transition for opacity and transform */
  }
  .email-link {
    position: relative;
    /* text-decoration: underline; */
    text-underline-offset: 2px;
    color: inherit;
    display: inline-block;
    padding-bottom: 3px; /* Adjusts spacing below text */
  }

  .email-link:hover {
    color: #6b6b6b; /* Change color on hover */
  }

  /* .underline {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px; 
    background-color: black;
    transition: width 0.3s ease-in-out; 
  }

  .email-link:hover .underline {
    width: 100%; 
  } */

  .clients {
    font-size: 0.75rem;
  }

  @media (max-width: 768px) {
    .about-title {
      font-size: 0.825rem;
    }
  }

  .menu-open .about-title {
    opacity: 1; /* Fade in */
    transform: translate(0%, 0%); /* Slide into position */
  }
</style>
