<script>
    import '../app.css';
  </script>
  
  <nav class="fixed bottom-0 left-0 w-full flex justify-between p-4 text-black bg-transparent">
    <div class="flex flex-col ml-8 text-[1.125rem]">
      <a href="/work" class="mb-2">work</a>
      <a href="/contact">contact</a>
    </div>
    <div class="mr-8 flex flex-col items-start justify-end">
      <a href="/" class="text-[1.5rem]">Kana Motojima</a>
    </div>
  </nav>
  
  <slot />
  
  <style>
    /* Any additional styles can go here */
  </style>
  