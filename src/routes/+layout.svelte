<nav class="navbar">
  <div>
    <a href="/work">work</a>
    <a href="/contact">contact</a>
  </div>
  <div>
    <a href="/">Kana Motojima</a>
  </div>
</nav>

<slot />

<style>
  .navbar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    color: black;
    background-color: transparent; /* Make it invisible */
    font-family: Arial, sans-serif;
  }
  .navbar a {
    color: inherit;
    text-decoration: none;
  }
</style>
