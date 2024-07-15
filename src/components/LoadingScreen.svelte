<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import { fly, fade } from 'svelte/transition';

  const dispatch = createEventDispatcher();

  let loadingText = 'Loading...';
  let showButton = false;

  const loadingPhases = [
    'Loading AI modules...', 
    'Initializing neural network...', 
    'Connecting to the matrix...', 
    'Waking up the bots...',
    'Almost there...'
  ];

  let currentPhaseIndex = 0;
  const updateLoadingText = () => {
    loadingText = loadingPhases[currentPhaseIndex];
    currentPhaseIndex = (currentPhaseIndex + 1) % loadingPhases.length;
  };

  let intervalId;
  let timeoutId;

  onMount(() => {
    intervalId = setInterval(updateLoadingText, 1500);

    timeoutId = setTimeout(() => {
      clearInterval(intervalId);
      showButton = true;
    }, 7500);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  });

  const handleClick = () => {
    dispatch('alvanworld-loading-done');
  };
</script>

<div class="loading-screen" out:fade={{ duration: 1000 }}> 
  <div class="background-animation">
    <div class="circle circle1"></div>
    <div class="circle circle2"></div>
    <div class="circle circle3"></div>
  </div>
  <div class="content" in:fade={{ duration: 1000, delay: 1000 }}>
    <div class="welcome-text">
      {#each 'AlvanWorld' as letter, i}
        <span class="letter" style="--delay: {i * 100}ms">
          {letter}
        </span>
      {/each}
    </div>
    <div class="loading-message">
      {loadingText}
    </div>
    {#if showButton}
      <button 
        on:click={handleClick}
        class="transition-button" 
        in:fly={{ y: 50, duration: 500 }} 
      >
        Let's Go
      </button>
    {/if}
  </div>
</div>

<style>
  .loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #121212;
    color: #fff;
    font-family: 'Roboto', sans-serif;
    overflow: hidden;
    z-index: 1000; 
  }

  .content {
    text-align: center;
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 600px;
    padding: 20px;
  }

  .background-animation {
    position: absolute; 
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden; 
    z-index: 1; 
  }

  .circle {
    position: absolute;
    width: 300px; 
    height: 300px; 
    border-radius: 50%;
    background: linear-gradient(to right, #8e44ad, #f0e3ff);
    opacity: 0.3; 
  }

  .circle1 {
    top: 20%;
    left: 30%;
    animation: moveCircle1 10s linear infinite; 
  }

  .circle2 {
    top: 60%;
    left: 70%;
    animation: moveCircle2 12s linear infinite; 
  }

  .circle3 {
    top: 80%;
    left: 10%;
    animation: moveCircle3 15s ease-in-out infinite alternate; 
  }

  @keyframes moveCircle1 {
    0%, 100% { transform: translate(0, 0); opacity: 0.1; }
    50% { transform: translate(100px, -100px); opacity: 0.3; }
  }

  @keyframes moveCircle2 {
    0%, 100% { transform: translate(0, 0); opacity: 0.1; }
    50% { transform: translate(-100px, 100px); opacity: 0.3; }
  }

  @keyframes moveCircle3 {
    0% { transform: translate(0, 0); opacity: 0.1; }
    100% { transform: translate(100px, -100px); opacity: 0.3; }
  }

  .welcome-text {
    font-size: 4em;
    font-weight: bold;
    margin-bottom: 1rem;
    display: inline-block; 
  }

  .letter {
    display: inline-block;
    opacity: 0;
    animation: appear 1s ease-in-out forwards; 
    animation-delay: var(--delay);
  }

  @keyframes appear {
    to {
      opacity: 1;
    }
  }

  .loading-message {
    font-size: 1.5em;
    color: #bbb;
    margin-bottom: 2rem;
    animation: pulseText 1.5s infinite alternate;
  }

  @keyframes pulseText {
    to {
      opacity: 0.7;
    }
  }

  .transition-button {
    padding: 15px 30px;
    font-size: 1.5em;
    background-color: rgba(255, 255, 255, 0.7);
    color: #444;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
  }

  .transition-button:hover {
    background-color: #f0e3ff;
    color: #333;
  } 
</style>