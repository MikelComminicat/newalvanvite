<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let models = [];
  export let selectedModel;

  function handleModelChange(model) {
    dispatch('modelChange', model);
  }
</script>

<div class="sidebar">
  <h2>Model Selection</h2>
  {#each models as model}
    <button 
      class="model-button {selectedModel.id === model.id ? 'selected' : ''}" 
      on:click={() => handleModelChange(model)}
    >
      <h3>{model.name}</h3>
      <p>{model.description}</p>
    </button>
  {/each}
</div>

<style lang="scss">
  .sidebar {
    width: 250px;
    padding: 1rem;
    background-color: var(--chat-bg);
    color: var(--text-color);
    overflow-y: auto;
    border-right: 1px solid var(--secondary-color);

    h2 {
      margin-bottom: 1rem;
      color: var(--text-color);
    }

    .model-button {
      width: 100%;
      margin-bottom: 1rem;
      padding: 1rem;
      background-color: transparent;
      border: 2px solid transparent;
      border-radius: 8px;
      color: var(--text-color);
      cursor: pointer;
      transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
      text-align: left;

      &:hover {
        background-color: var(--secondary-color);
      }

      &.selected {
        background-color: var(--primary-color);
        border-color: var(--primary-color);
        color: var(--background-color);
      }

      h3 {
        margin-top: 0;
        margin-bottom: 0.5rem;
      }

      p {
        margin: 0;
        font-size: 0.9em;
      }
    }
  }
</style>