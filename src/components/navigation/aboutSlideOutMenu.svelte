<script>
    export let isOpen = false;
    export let toggleMenu;
  </script>
  
  <div class="menu {isOpen ? 'open' : ''}">
    <div class="menu-content">
      <p>Kana Motojima is a visual artist based in New York. Born and raised in Honolulu and studied photography in Tokyo. Her work focuses on the subtle details of intimacy and relationship through photo or video.</p>
      <p>Bilingual in Japanese and English.</p>
      <p>For all inquiries please email: motojimakana@gmail.com</p>
      <p class="font-bold mb-0">Selected clients:</p>
      <ul>
        <li>New York Times Magazine</li>
        <li>New York Times</li>
        <li>The Cut</li>
        <li>I.D.</li>
        <li>Crack Magazine</li>
        <li>Flaunt Magazine</li>
      </ul>
    </div>
  </div>
  
  <style>
    .menu {
      position: fixed;
      top: 0;
      right: -100%;
      width: 50%;
      max-width: 50%;
      height: 100%;
      background-color: white;
      box-shadow: -2px 0 5px rgba(0,0,0,0.5);
      transition: right 0.3s ease-in-out;
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  
    .menu.open {
      right: 0;
    }
  
    .menu-content {
      padding: 20px;
      text-align: left;
      max-width: 60%;
    }
  
    .menu-content p {
      margin-bottom: 1em;
      line-height: 24px;
    }
  
    .menu-content ul {
      list-style-type: none;
      padding: 0;
    }
  
    .menu-content li {
     
    }
  </style>
  