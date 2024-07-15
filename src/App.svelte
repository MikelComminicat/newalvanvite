<script>
	import ChatWindow from './components/ChatWindow.svelte';
	import LoadingScreen from './components/LoadingScreen.svelte';
	import { onMount } from 'svelte';

	let isLoading = true;

	onMount(() => {
		setTimeout(() => {
			isLoading = false;
		}, 10000); 
	});

	const handleLoadingDone = () => {
		isLoading = false;
	};
</script>

<main>
	{#if isLoading}
		<LoadingScreen on:alvanworld-loading-done={handleLoadingDone} />
	{:else}
		<ChatWindow />
	{/if}
</main>

<style lang="scss">
  :global(body) {
    margin: 0;
    padding: 0;
  }

  main {
    height: 100vh;
    width: 100vw;
    background-color: var(--background-color); 
    color: var(--text-color);
    font-family: 'Roboto', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: opacity 0.5s ease-in-out; 
  }
</style>




