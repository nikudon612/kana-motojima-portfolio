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
  class="mobile:h-[100px] fixed bottom-0 left-0 w-full flex justify-between px-4 py-10 text-black bg-transparent mobile:fixed mobile:top-0 mobile:left-0 mobile:w-full mobile:flex mobile:justify-between mobile:items-center mobile:px-4 mobile:py-2 mobile:bg-white"
  style="z-index: 2001;"
>
  <div
    class="flex flex-col ml-8 text-[1.125rem] mobile:flex-row mobile:space-x-8 mobile:ml-0 mobile:text-[1rem]"
    style="z-index: 2001;"
  >
    <p
      class="mb-2 hover:cursor-pointer toggle-menu-btn desktop:mb-0 mobile:mb-0"
      on:click={toggleWorkMenu}
      class:opacity-50={aboutIsOpen}
    >
      work
    </p>
    <p
      class="mb-2 hover:cursor-pointer toggle-menu-btn desktop:mb-0 mobile:mb-0"
      on:click={openAboutMenuFromContact}
      class:opacity-50={workIsOpen}
    >
      contact
    </p>
  </div>
  <div
    class="mr-8 flex flex-col items-start justify-end mobile:flex-row mobile:items-center mobile:mr-0"
    style="z-index: 2001;"
  >
    <a
      href="/"
      class="text-[1.5rem] hover:cursor-pointer toggle-menu-btn mobile:text-lg mobile:font-bold"
    >
      Kana Motojima
    </a>
  </div>
</nav>

<AboutSlideOutMenu
  isOpen={aboutIsOpen}
  isClosing={aboutIsClosing}
  toggleMenu={toggleAboutMenu}
/>
<WorkSlideOutMenu
  isOpen={workIsOpen}
  isClosing={workIsClosing}
  toggleMenu={toggleWorkMenu}
/>

<slot />

<style>
  .opacity-50 {
    opacity: 0.5;
  }
</style>
