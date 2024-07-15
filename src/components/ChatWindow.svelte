<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import MessageList from './MessageList.svelte';
  import MessageInput from './MessageInput.svelte';
  import Header from './Header.svelte';
  import Sidebar from './Sidebar.svelte';
  import { sendMessage } from '../services/huggingface.js';

  let models = [
    { 
      id: 'meta-llama/Meta-Llama-3-70B-Instruct', 
      name: 'Meta-Llama-3-70B', 
      type: 'text',
      description: 'A powerful language model from Meta.'
    },
    { 
      id: 'mann-e/Mann-E_Dreams', 
      name: 'Mann-E Dreams', 
      type: 'image',
      description: 'A state-of-the-art image generation model.' 
    }
  ];

  let messages = [
    { 
      id: 1, 
      content: 'Welcome to Alvan-AI! 👋',
      sender: 'bot', 
      type: 'text' 
    },
    { 
      id: 2, 
      content: 'How can I help you today? 😊',
      sender: 'bot', 
      type: 'text' 
    }
  ];
  let selectedModel = models[0];
  let isSidebarOpen = true;
  let isLoading = false;
  let loadingMessage = '';

  function toggleSidebar() {
    isSidebarOpen = !isSidebarOpen;
  }

  async function handleNewMessage(event) {
    const userMessage = {
      id: messages.length + 1,
      content: event.detail.text,
      sender: 'user',
      type: 'text'
    };
    messages = [...messages, userMessage];

    isLoading = true;
    loadingMessage = selectedModel.type === 'text' ? 'Typing...' : 'Generating image...';

    try {
      const response = await sendMessage(selectedModel.id, event.detail.text);
      console.log('Response from API:', response);
      const botMessage = {
        id: messages.length + 1,
        content: response,
        sender: 'bot',
        type: selectedModel.type
      };
      console.log('Bot message:', botMessage);
      messages = [...messages, botMessage];
    } catch (error) {
      console.error('Error processing message:', error);
      messages = [...messages, {
        id: messages.length + 1,
        content: "Sorry, I'm having trouble processing your request. Please try again.",
        sender: 'bot',
        type: 'text'
      }];
    } finally {
      isLoading = false;
      loadingMessage = '';
    }
  }

  function handleModelChange(event) {
    const newModel = event.detail;
    if (newModel.id !== selectedModel.id) {
      selectedModel = newModel;
      const switchMessage = {
        id: messages.length + 1,
        content: `Model switched to ${selectedModel.name}. You can now ${selectedModel.type === 'text' ? 'chat with' : 'generate images using'} this model.`,
        sender: 'system',
        type: 'text'
      };
      messages = [...messages, switchMessage];
    }
  }

  function scrollToBottom() {
    const messageList = document.querySelector('.message-list');
    if (messageList) {
      messageList.scrollTo({
        top: messageList.scrollHeight,
        behavior: 'smooth'
      });
    }
  }

  onMount(() => {
    scrollToBottom();
  });

  $: messages, setTimeout(scrollToBottom, 0);
</script>

<div class="chat-window">
  <Header {toggleSidebar} />
  <div class="main-content">
    {#if isSidebarOpen}
      <Sidebar {models} {selectedModel} on:modelChange={handleModelChange} />
    {/if}
    <div class="chat-area" transition:fade={{ duration: 300 }}>
      <MessageList {messages} {isLoading} {loadingMessage} modelType={selectedModel.type} />
      <MessageInput on:sendMessage={handleNewMessage} />
    </div>
  </div>
</div>

<style lang="scss">
  .chat-window {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    background-color: var(--background-color);
    color: var(--text-color);
  }

  .main-content {
    display: flex;
    flex: 1;
    overflow: hidden;
  }

  .chat-area {
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: var(--chat-bg);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    margin: 1rem;
    border-radius: 10px;
    overflow: hidden;
  }

  :global(.message-list) {
    flex: 1;
    overflow-y: auto;
  }

  :global(.message-list::-webkit-scrollbar) {
    width: 8px;
  }

  :global(.message-list::-webkit-scrollbar-track) {
    background: var(--chat-bg);
  }

  :global(.message-list::-webkit-scrollbar-thumb) {
    background-color: var(--secondary-color);
    border-radius: 4px;
  }
</style>