<script>
  import "../app.css";
  import { onMount } from "svelte";
  import AboutSlideOutMenu from "../components/navigation/aboutSlideOutMenu.svelte";
  import WorkSlideOutMenu from "../components/navigation/workSlideOutMenu.svelte";

  let aboutIsOpen = false;
  let workIsOpen = false;

  function toggleAboutMenu(event) {
    event.stopPropagation();
    aboutIsOpen = !aboutIsOpen;
    if (aboutIsOpen) {
      workIsOpen = false; // Close work menu if open
    }
  }

  function toggleWorkMenu(event) {
    event.stopPropagation();
    workIsOpen = !workIsOpen;
    if (workIsOpen) {
      aboutIsOpen = false; // Close about menu if open
    }
  }

  onMount(() => {
    const handleClickOutside = (event) => {
      if (
        (aboutIsOpen || workIsOpen) &&
        !event.target.closest(".menu") &&
        !event.target.closest(".toggle-menu-btn")
      ) {
        aboutIsOpen = false;
        workIsOpen = false;
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
    <p class="mb-2 hover:cursor-pointer" class:opacity-50={workIsOpen}>
      contact
    </p>
  </div>
  <div
    class="mr-8 flex flex-col items-start justify-end"
    style="z-index: 2001;"
  >
    <p
      class="text-[1.5rem] hover:cursor-pointer toggle-menu-btn"
      on:click={toggleAboutMenu}
    >
      Kana Motojima
    </p>
  </div>
</nav>

<AboutSlideOutMenu isOpen={aboutIsOpen} />
<WorkSlideOutMenu isOpen={workIsOpen} />

<slot />

<style>
  /* Any additional styles can go here */
  .opacity-50 {
    opacity: 0.5;
  }
</style>
