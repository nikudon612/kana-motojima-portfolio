<script>
  export let isOpen = false;
  export let toggleMenu;
</script>

<div class="menu {isOpen ? 'open' : ''} {isOpen ? 'menu-open' : 'menu-close'}">
  <div class="menu-left {isOpen ? 'fade-in' : 'fade-out'}"></div>
  <div class="menu-right">
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
</div>

<style>
  .menu {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      z-index: 1000;
      transition: transform 0.3s ease-in-out;
  }

  .menu.menu-open {
      transform: translateX(0);
  }

  .menu.menu-close {
      transform: translateX(100%);
      transition-delay: 0.3s; /* Wait for the fade-out to finish */
  }

  .menu-left {
      flex: 1;
      background-color: rgba(0, 0, 0, 0);
      transition: background-color 0.3s ease-in-out;
  }

  .menu-left.fade-in {
      background-color: rgba(0, 0, 0, 0.6);
      transition-delay: 0.3s;
  }

  .menu-left.fade-out {
      background-color: rgba(0, 0, 0, 0);
  }

  .menu-right {
      flex: 1;
      background-color: white;
      display: flex;
      align-items: center;
      justify-content: center;
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
      margin-bottom: 0.5em;
  }
</style>
