<script>
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';

  let input = '';
  let file = null;
  let isTyping = false;
  const dispatch = createEventDispatcher();

  function handleKeydown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  }

  function handleInput() {
    isTyping = input.trim().length > 0;
  }

  function sendMessage() {
    if (input.trim() || file) {
      dispatch('sendMessage', { text: input.trim(), file });
      input = '';
      file = null;
      isTyping = false;
    }
  }

  function handleFileChange(event) {
    file = event.target.files[0];
  }
</script>

<div class="message-input" transition:fade={{ duration: 300 }}>
  <label for="file-upload" class="file-upload-label">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <path fill="currentColor" d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8V4h8v14zM12 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
    </svg>
    <input
      id="file-upload"
      type="file"
      on:change={handleFileChange}
      style="display: none;"
    />
  </label>
  <textarea
    bind:value={input}
    on:keydown={handleKeydown}
    on:input={handleInput}
    placeholder="Type your message here..."
    rows="1"
  ></textarea>
  {#if isTyping}
    <div class="typing-indicator">
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
    </div>
  {/if}
</div>

<style lang="scss">
  .message-input {
    display: flex;
    align-items: center;
    padding: 1rem;
    background-color: var(--chat-bg);
    border-top: 1px solid var(--secondary-color);
    position: relative;

    textarea {
      flex: 1;
      padding: 0.5rem;
      border: 1px solid var(--secondary-color);
      border-radius: 20px;
      resize: none;
      font-family: inherit;
      font-size: 1rem;
      background-color: var(--background-color);
      color: var(--text-color);

      &:focus {
        outline: none;
        border-color: var(--primary-color);
      }
    }

    .file-upload-label {
      cursor: pointer;
      margin-right: 0.5rem;
      font-size: 1.5rem;

      svg {
        width: 1.2rem;
        height: 1.2rem;
      }
    }

    .typing-indicator {
      position: absolute;
      right: 1.5rem;
      bottom: 1.5rem;
      display: flex;
      align-items: center;

      .dot {
        height: 6px;
        width: 6px;
        border-radius: 50%;
        background-color: var(--secondary-color);
        margin: 0 2px;
        animation: blink 1s infinite;
        opacity: 0; /* Start invisible */

        &:nth-child(1) {
          animation-delay: 0.2s;
        }

        &:nth-child(2) {
          animation-delay: 0.4s;
        }
      }
    }
  }

  @keyframes blink {
    0%, 100% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
  }
</style>
