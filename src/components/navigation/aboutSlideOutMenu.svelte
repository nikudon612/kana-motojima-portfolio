<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  export let isOpen = false;
  export let isClosing = false;
  export let toggleMenu;

  let menuLeftVisible = true;

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

  // Use onMount to ensure this runs only in the browser
  onMount(() => {
    $: if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });

  // Watch for changes to isOpen and update body style in browser
  $: if (typeof window !== 'undefined' && isOpen) {
    document.body.style.overflow = 'hidden';
  } else if (typeof window !== 'undefined' && !isOpen) {
    document.body.style.overflow = '';
  }
</script>

<div class={`fixed top-0 left-0 w-full h-full flex z-[1000] transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'} ${isClosing ? 'transition-delay-[300ms]' : ''}`}>
  {#if menuLeftVisible}
    <div class={`flex-1 bg-transparent transition-colors duration-300 cursor-pointer ${isOpen ? 'bg-black/60 transition-delay-[300ms]' : 'bg-transparent'} hidden md:block`}
      on:click={handleMenuLeftClick}
      transition:fade={{ duration: 300 }}
      on:out={handleLeftFadeOut}
    ></div>
  {/if}
  <div class="flex-1 bg-white flex items-center justify-center w-full md:w-auto">
    <div class="p-5 text-left max-w-[90%] md:max-w-[60%]">
      <p class="mb-4 leading-6">
        Kana Motojima is a visual artist based in New York. Born and raised in
        Honolulu and studied photography in Tokyo. Her work focuses on the
        subtle details of intimacy and relationship through photo or video.
      </p>
      <p class="mb-4">Bilingual in Japanese and English.</p>
      <p class="mb-4">For all inquiries please email: motojimakana@gmail.com</p>
      <p class="font-bold mb-0">Selected clients:</p>
      <ul class="list-none p-0">
        <li class="mb-2">New York Times Magazine</li>
        <li class="mb-2">New York Times</li>
        <li class="mb-2">The Cut</li>
        <li class="mb-2">I.D.</li>
        <li class="mb-2">Crack Magazine</li>
        <li class="mb-2">Flaunt Magazine</li>
      </ul>
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
