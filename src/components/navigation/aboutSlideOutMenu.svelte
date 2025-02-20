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
    // console.log("Menu transition ended:", event.propertyName);
    if (event.propertyName === "transform" && isClosing) {
      dispatch("transitionend");
      // console.log("Resetting isClosing state after slide-out transition");
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
          <div class="contact-section">
            <div class="left-side">
              <p class="about-title w-full">For all inquiries, please email:</p>
              <a href="mailto:{aboutData.contactInfo}" class="email-link">
                {aboutData.contactInfo}
              </a>
            </div>
            <p class="about-title instagram-link">
              <a
                href="https://www.instagram.com/kanamotojima/"
                target="_blank"
                class="social-link"
              >
                Instagram
              </a>
            </p>
          </div>

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

  .left-side {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
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
    color: inherit;
    display: inline-block;
  }
  .contact-section {
    display: flex;
    justify-content: space-between; /* Pushes email and Instagram apart */
    align-items: flex-end; /* Ensures both elements align vertically */
    width: 100%;
    gap: 2rem; /* Space between email and Instagram */
  }

  .email-container,
  .instagram-container {
    display: flex;
    align-items: center; /* Aligns both text elements properly */
  }

  .email-link,
  .instagram-link {
    white-space: nowrap; /* Prevents wrapping */
  }

  .email-link:hover,
  .instagram-link:hover {
    color: #6b6b6b; /* Matching hover effect */
  }

  .about-content-list {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .clients {
    font-size: 0.75rem;
  }

  @media (max-width: 768px) {
    .contact-section {
      gap: 1rem;
    }
    .about-title {
      font-size: 0.825rem;
    }
    .email-link {
      font-size: 0.825rem;
    }
  }

  .menu-open .about-title {
    opacity: 1; /* Fade in */
    transform: translate(0%, 0%); /* Slide into position */
  }
</style>
