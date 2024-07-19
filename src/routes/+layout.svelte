<script>
  import "../app.css";
  import { onMount } from "svelte";
  import AboutSlideOutMenu from "../components/navigation/aboutSlideOutMenu.svelte";
  import WorkSlideOutMenu from "../components/navigation/workSlideOutMenu.svelte";

  let aboutIsOpen = false;
  let workIsOpen = false;
  let aboutIsClosing = false;
  let workIsClosing = false;

  function toggleAboutMenu(event) {
    event?.stopPropagation(); // Ensure event is optional and handled
    if (aboutIsOpen) {
      aboutIsClosing = true;
      setTimeout(() => {
        aboutIsOpen = false;
        aboutIsClosing = false;
      }, 300); // Delay to match the left menu close animation duration
    } else {
      aboutIsOpen = true;
      workIsOpen = false; // Close work menu if open
      workIsClosing = false;
    }
  }

  function toggleWorkMenu(event) {
    event?.stopPropagation(); // Ensure event is optional and handled
    if (workIsOpen) {
      workIsClosing = true;
      setTimeout(() => {
        workIsOpen = false;
        workIsClosing = false;
      }, 300); // Delay to match the left menu close animation duration
    } else {
      workIsOpen = true;
      aboutIsOpen = false; // Close about menu if open
      aboutIsClosing = false;
    }
  }

  function openAboutMenuFromContact(event) {
    event?.stopPropagation(); // Ensure event is optional and handled
    if (aboutIsOpen) {
      toggleAboutMenu(event); // Close the about menu if it is open
    }
    aboutIsOpen = true;
    workIsOpen = false; // Close work menu if open
    workIsClosing = false;
  }

  onMount(() => {
    const handleClickOutside = (event) => {
      if (
        (aboutIsOpen || workIsOpen) &&
        !event.target.closest(".menu") &&
        !event.target.closest(".toggle-menu-btn")
      ) {
        if (aboutIsOpen) {
          aboutIsClosing = true;
          setTimeout(() => {
            aboutIsOpen = false;
            aboutIsClosing = false;
          }, 300); // Delay to match the left menu close animation duration
        }
        if (workIsOpen) {
          workIsClosing = true;
          setTimeout(() => {
            workIsOpen = false;
            workIsClosing = false;
          }, 300); // Delay to match the left menu close animation duration
        }
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<nav
  class="fixed bottom-0 left-0 w-full flex justify-between px-4 py-10 text-black bg-transparent"
  style="z-index: 2000;"
>
  <div class="flex flex-col ml-8 text-[1.125rem]" style="z-index: 2001;">
    <p
      class="mb-2 hover:cursor-pointer toggle-menu-btn"
      on:click={toggleWorkMenu}
      class:opacity-50={aboutIsOpen}
    >
      work
    </p>
    <p class="mb-2 hover:cursor-pointer toggle-menu-btn" on:click={openAboutMenuFromContact} class:opacity-50={workIsOpen}>
      contact
    </p>
  </div>
  <div
    class="mr-8 flex flex-col items-start justify-end"
    style="z-index: 2001;"
  >
    <a href="/" class="text-[1.5rem] hover:cursor-pointer toggle-menu-btn">
      Kana Motojima
    </a>
  </div>
</nav>

<AboutSlideOutMenu isOpen={aboutIsOpen} isClosing={aboutIsClosing} toggleMenu={toggleAboutMenu} />
<WorkSlideOutMenu isOpen={workIsOpen} isClosing={workIsClosing} toggleMenu={toggleWorkMenu} />

<slot />

<style>
  .opacity-50 {
    opacity: 0.5;
  }
</style>
