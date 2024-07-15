<script>
  import { onMount } from 'svelte';
  import hljs from 'highlight.js';
  import 'highlight.js/styles/a11y-dark.css'; // Import a dark mode theme for highlight.js

  export let message;

  let formattedContent;

  onMount(() => {
    if (message.type === 'text' && message.content.includes('```')) {
      formattedContent = formatMessage(message.content);
    } else {
      formattedContent = formatPlainText(message.content);
    }
  });

  function formatMessage(content) {
    const codeRegex = /```(\w+)?\s*([\s\S]*?)```/g;
    return content.replace(codeRegex, (_, lang, code) => {
      const language = lang || 'plaintext';
      const highlightedCode = hljs.highlight(code.trim(), { language }).value;
      return `<pre><code class="hljs ${language}">${highlightedCode}</code><button class="copy-button">Copy</button></pre>`;
    });
  }

  function formatPlainText(content) {
    return content.replace(/\n/g, '<br>');
  }

  function copyCode(event) {
    const pre = event.target.closest('pre');
    if (pre) {
      const code = pre.querySelector('code').innerText;
      navigator.clipboard.writeText(code);
      const copyButton = pre.querySelector('.copy-button');
      copyButton.textContent = 'Copied!';
      setTimeout(() => {
        copyButton.textContent = 'Copy';
      }, 2000);
    }
  }
</script>

<div class="message {message.sender}">
  {#if message.type === 'image'}
    <div class="image-container">
      <img src={message.content} alt="Generated image" />
    </div>
  {:else if message.type === 'text'}
    <div class="text-content">{@html formattedContent}</div>
  {/if}
</div>

<style lang="scss">
  .message {
    max-width: 70%;
    margin-bottom: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    line-height: 1.4;
    word-wrap: break-word;
    overflow: hidden;

    &.user {
      align-self: flex-end;
      background-color: var(--user-message-bg);
      color: var(--background-color);
    }

    &.bot {
      align-self: flex-start;
      background-color: var(--bot-message-bg);
      color: var(--text-color);
    }
  }

  .text-content {
    white-space: pre-wrap;
    word-break: break-word;
    
    :global(pre) {
      background-color: #282c34;
      padding: 1rem;
      border-radius: 4px;
      overflow-x: auto;
      margin: 1rem 0;
      max-height: 300px;
      overflow-y: auto;
      white-space: pre-wrap;
      word-break: break-word;
    }
    
    :global(.copy-button) {
      position: relative; /* Position the button within the pre element */
      float: right; /* Float the button to the right */
      background-color: var(--secondary-color);
      color: var(--background-color);
      border: none;
      padding: 0.2rem 0.5rem;
      font-size: 0.8em;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 0.5rem;
    }
    
    :global(.copy-button:hover) {
      background-color: var(--primary-color);
    }
    
    :global(pre), :global(code) {
      font-family: 'Courier New', Courier, monospace;
    }
    
    :global(.hljs) {
      background-color: transparent;
      color: #abb2bf;
    }
  }

  .image-container {
    position: relative;
    display: inline-block;
    background: none;
    border: none;
    padding: 0;
  }

  img {
    max-width: 100%;
    border-radius: 10px;
  }
</style>

<svelte:window on:click={copyCode} />
