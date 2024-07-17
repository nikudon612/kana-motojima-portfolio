<script>
    export let isOpen = false;
  </script>
  
  <div class="menu {isOpen ? 'open' : ''}">
    <div class="menu-content">
      <p>Crack Magazine - Mdou Moctar</p>
      <p>Christina Rilling - New York Times</p>
      <p>Auli'i Cravalho - The Cut</p>
      <p>Phoenix - After Midnight BTS</p>
      <p>The City Awakens - New York Times Magazine</p>
    </div>
  </div>
  
  <style>
    .menu {
      position: fixed;
      top: 0;
      left: -100%;
      width: 50%;
      height: 100%;
      background-color: white;
      box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5);
      transition: left 0.3s ease-in-out;
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  
    .menu.open {
      left: 0;
    }
  
    .menu-content {
      padding: 20px;
      text-align: left;
    }
  
    .menu-content p {
      margin-bottom: 1em;
    }
  </style>
  