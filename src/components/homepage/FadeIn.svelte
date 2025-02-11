<script>
    import { onMount } from "svelte";
  
    export let duration = 500;
    let wrapper; // New wrapper for IntersectionObserver
    let isVisible = false;
  
    onMount(() => {
      if (!wrapper) {
        console.error("❌ No wrapper found to observe.");
        return;
      }
  
      console.log("✅ Observing wrapper:", wrapper);
  
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            console.log(`👀 Entry detected: ${entry.target.tagName}`, {
              isIntersecting: entry.isIntersecting,
            });
  
            if (entry.isIntersecting) {
              console.log("🎉 Wrapper is now visible:", entry.target);
              isVisible = true;
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );
  
      observer.observe(wrapper);
    });
  </script>
  
  <!-- Wrapper to detect scroll visibility -->
  <div bind:this={wrapper} class="fade-wrapper">
    <div
      class="fade-container {isVisible ? 'visible' : ''}"
      style="transition-duration: {duration}ms;"
    >
      <slot />
    </div>
  </div>
  
  <style>
    /* Wrapper must be in document flow for observer to detect it */
    .fade-wrapper {
      position: relative;
      width: 100%;
      height: 300px; /* Adjust height as needed */
    }
  
    .fade-container {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 1s ease-out, transform 1s ease-out;
      will-change: opacity, transform;
    }
  
    .fade-container.visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  </style>
  