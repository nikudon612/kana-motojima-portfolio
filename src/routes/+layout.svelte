<script>
  import "../app.css";
  import { onMount } from "svelte";
  import AboutSlideOutMenu from "../components/navigation/AboutSlideOutMenu.svelte";

  let isOpen = false;

  function toggleMenu(event) {
    event.stopPropagation();
    isOpen = !isOpen;
  }

  onMount(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        !event.target.closest(".menu") &&
        !event.target.closest(".toggle-menu-btn")
      ) {
        isOpen = false;
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });
</script>

<nav
  class="fixed bottom-0 left-0 w-full flex justify-between px-4 py-10 text-black bg-transparent"
  style="z-index: 2000;"
>
  <div class="flex flex-col ml-8 text-[1.125rem]" style="z-index: 2001;">
    <a href="/work" class="mb-2">work</a>
    <a href="/contact">contact</a>
  </div>
  <div
    class="mr-8 flex flex-col items-start justify-end"
    style="z-index: 2001;"
  >
    <p
      class="text-[1.5rem] hover:cursor-pointer toggle-menu-btn"
      on:click={toggleMenu}
    >
      Kana Motojima
    </p>
  </div>
</nav>

<AboutSlideOutMenu {isOpen} />

<slot />

<style>
  /* Any additional styles can go here */
</style>
