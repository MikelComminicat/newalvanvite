<script>
  export let toggleSidebar;
</script>

<header>
  <button on:click={toggleSidebar}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <path fill="currentColor" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
    </svg>
  </button>
  <h1>Alvan-AI</h1>
</header>

<style lang="scss">
  header {
    background-color: var(--background-color);
    color: var(--text-color);
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    button {
      background: none;
      border: none;
      color: var(--text-color);
      font-size: 1.5rem;
      cursor: pointer;
      position: absolute;
      left: 1rem;
      padding: 0; /* Remove default button padding */

      svg {
        width: 1.5rem;
        height: 1.5rem;
      }
    }

    h1 {
      font-size: 1.5rem;
      margin: 0;
    }
  }
</style>