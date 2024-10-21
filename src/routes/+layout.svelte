<script>
  import "../app.css";
  import WorkMenu from "../components/navigation/workSlideOutMenu.svelte";
  import AboutMenu from "../components/navigation/aboutSlideOutMenu.svelte";
  import OpacityLayer from "../components/navigation/opacityLayer.svelte";

  let isWorkOpen = false;
  let isAboutOpen = false;
  let isClosing = false;
  let isVisible = false;
  let hoverOnWork = false;
  let hoverOnContact = false;

  function openWorkMenu() {
    if (isWorkOpen) {
      // Close Work Menu if it is already open
      closeAll();
    } else if (isAboutOpen) {
      // Close About Menu if it's open, then open Work Menu
      closeAll(() => {
        isWorkOpen = true;
        isVisible = true;
      });
    } else {
      isVisible = true; // Ensure opacity layer is visible
      isWorkOpen = true;
    }
  }

  function openAboutMenu() {
    if (isAboutOpen) {
      // Close About Menu if it is already open
      closeAll();
    } else if (isWorkOpen) {
      // Close Work Menu if it's open, then open About Menu
      closeAll(() => {
        isAboutOpen = true;
        isVisible = true;
      });
    } else {
      isVisible = true; // Ensure opacity layer is visible
      isAboutOpen = true;
    }
  }

  function closeAll(callback) {
    if (isWorkOpen || isAboutOpen) {
      isClosing = true; // Start closing animation
      isWorkOpen = false;
      isAboutOpen = false;

      setTimeout(() => {
        isClosing = false;
        if (callback) {
          callback(); // Open the other menu after closing
        } else {
          isVisible = false; // Hide the opacity layer if no other menu opens
        }
      }, 1000); // Wait for the closing animation to finish
    }
  }

  function handleTransitionEnd(event) {
    if (event?.propertyName === "opacity" && isClosing) {
      // Ensure the closing state is reset properly
      isClosing = false;
      isVisible = false;
    }
  }
</script>

<!-- Controls -->
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
      on:click={openWorkMenu}
      on:mouseenter={() => (hoverOnWork = true)}
      on:mouseleave={() => (hoverOnWork = false)}
      class:opacity-50={hoverOnContact || isAboutOpen}
    >
      work
    </button>
    <button
      class="mb-2 hover:cursor-pointer toggle-menu-btn desktop:mb-2 mobile:mb-0"
      on:click={openAboutMenu}
      on:mouseenter={() => (hoverOnContact = true)}
      on:mouseleave={() => (hoverOnContact = false)}
      class:opacity-50={hoverOnWork || isWorkOpen}
    >
      contact
    </button>
  </div>
  <div
    class="mr-4 flex flex-col items-start justify-end mobile:flex-row mobile:items-center mobile:mr-0"
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

<!-- Overlay Container -->
<div
  class="overlay-container"
  style="z-index: {isWorkOpen || isAboutOpen || isClosing ? 2000 : 0};"
>
  <!-- Opacity Layer -->
  <OpacityLayer
    {isVisible}
    {isClosing}
    onClick={closeAll}
    on:transitionend={handleTransitionEnd}
  />

  <!-- Menus -->
  <WorkMenu
    {isWorkOpen}
    {isClosing}
    onClose={closeAll}
    on:transitionend={handleTransitionEnd}
  />
  <AboutMenu
    {isAboutOpen}
    {isClosing}
    onClose={closeAll}
    on:transitionend={handleTransitionEnd}
  />
</div>

<!-- Slot for Homepage Content -->
<slot />

<style>
  .overlay-container {
    position: relative;
  }

  .opacity-50 {
    opacity: 0.5;
  }
  .toggle-menu-btn {
    transition: opacity 300ms ease-in-out; /* Add the transition property here */
  }
  .kana-text a {
    color: black; /* Set initial color to black */
    mix-blend-mode: difference; /* This will invert the color based on the background */
    background: transparent; /* Ensure background is transparent */
    padding: 0.5rem; /* Optional: add padding for better visibility */
    border-radius: 5px; /* Optional: add border radius for aesthetics */
    white-space: nowrap; /* Ensure the text doesn't wrap */
  }
</style>
