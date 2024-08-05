<script>
  import "../app.css";
  import { onMount } from "svelte";
  import AboutSlideOutMenu from "../components/navigation/aboutSlideOutMenu.svelte";
  import WorkSlideOutMenu from "../components/navigation/workSlideOutMenu.svelte";

  let aboutIsOpen = false;
  let workIsOpen = false;
  let aboutIsClosing = false;
  let workIsClosing = false;
  let isFadingOut = false;

  console.log("web development by Nick Bechtel (https://nickbechtel.com)");

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
      closeMenu();
    } else {
      workIsOpen = true;
      aboutIsOpen = false; // Close about menu if open
      aboutIsClosing = false;
    }
  }

  function closeMenu() {
    isFadingOut = true; // Trigger fade out
    setTimeout(() => {
      isFadingOut = false;
      workIsOpen = false;
      workIsClosing = false;
    }, 300); // Delay to match the fade out transition duration
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
          closeMenu();
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
  class="mobile:h-[50px] fixed bottom-0 left-0 w-full flex justify-between px-[3rem] mobile:py-0 py-10 text-black bg-transparent mobile:fixed mobile:top-0 mobile:left-0 mobile:w-full mobile:flex mobile:justify-between mobile:items-center mobile:px-[1.5rem] mobile:py-[4rem] mobile:bg-white"
  style="z-index: 2001;"
>
  <div
    class="flex flex-col items-start text-[1.125rem] mobile:flex-row mobile:ml-0 ml-0 mobile:text-[1rem] mobile:gap-4"
    style="z-index: 2001;"
  >
    <button
      class="mb-2 hover:cursor-pointer toggle-menu-btn desktop:mb-2 mobile:mb-0"
      on:click={toggleWorkMenu}
      class:opacity-50={aboutIsOpen}
    >
      work
    </button>
    <button
      class="mb-2 hover:cursor-pointer toggle-menu-btn desktop:mb-2 mobile:mb-0"
      on:click={openAboutMenuFromContact}
      class:opacity-50={workIsOpen}
    >
      contact
    </button>
  </div>
  <div
    class="mr-8 flex flex-col items-start justify-end mobile:flex-row mobile:items-center mobile:mr-0"
    style="z-index: 2001;"
  >
    <a
      href="/"
      class="text-[1.5rem] hover:cursor-pointer toggle-menu-btn mobile:text-lg mobile:font-bold mobile:hidden"
    >
      Kana Motojima
    </a>
  </div>
  <div
    class="kana-text hidden mobile:block fixed right-[-3rem] bottom-[6rem] text-lg font-bold z-2005 -rotate-90"
  >
    <a href="/" class="">Kana Motojima</a>
  </div>
</nav>

<AboutSlideOutMenu
  isOpen={aboutIsOpen}
  isClosing={aboutIsClosing}
  toggleMenu={toggleAboutMenu}
/>
<WorkSlideOutMenu isOpen={workIsOpen} toggleMenu={closeMenu} {isFadingOut} />

<slot />

<style>
  .opacity-50 {
    opacity: 0.5;
  }
  .kana-text a {
    color: black; /* Set initial color to white */
    mix-blend-mode: difference; /* This will invert the color based on the background */
    background: transparent; /* Ensure background is transparent */
    padding: 0.5rem; /* Optional: add padding for better visibility */
    border-radius: 5px; /* Optional: add border radius for aesthetics */
    white-space: nowrap; /* Ensure the text doesn't wrap */
  }
</style>
