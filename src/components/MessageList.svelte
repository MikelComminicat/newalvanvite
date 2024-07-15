<script>
    import { fade, fly } from 'svelte/transition';
    import MessageItem from './MessageItem.svelte';

    export let messages = [];
    export let isLoading = false;
    export let loadingMessage = '';
    export let modelType = 'text';

    function downloadImage(imageUrl) {
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'generated-image.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function isValidImageUrl(urlString) {
        console.log('Checking URL:', urlString);
        return typeof urlString === 'string' && urlString.startsWith('blob:');
    }
     
    function formatLongMessage(content) {
        const lines = content.split('\n');
        return lines.map((line, index) => `<p key=${index}>${line}</p>`).join('');
    }

	function getLoadingAnimation(type) {
        if (type === 'text') {
            return `
                <div class="typing">
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                </div>
            `;
        } else {
            return `
                <div class="image-loading">
                    <div class="spinner"></div>
                    <p>Generating image...</p>
                </div>
            `;
        }
    }
</script>

<div class="message-list">
    {#each messages as message, index (message.id)}
        <div
            class="message-wrapper {message.sender}"
            in:fly={{ y: 25, duration: 300, delay: 50 * index }}
            out:fade={{ duration: 200 }}
        >
            {#if message.type === 'image'}
                <div class="image-container">
                    {#if isValidImageUrl(message.content)}
                        <img src={message.content} alt="Generated image" />
                        <button class="download-button" on:click={() => downloadImage(message.content)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                <path
                                    fill="currentColor"
                                    d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"
                                />
                            </svg>
                        </button>
                    {:else}
                        <p>Invalid image URL: {message.content}</p>
                    {/if}
                </div>
            {:else}
                <div class="message">
                    {@html formatLongMessage(message.content)}
                </div>
            {/if}
        </div>
    {/each}
    {#if isLoading}
        <div
            class="message-wrapper bot"
            in:fly={{ y: 25, duration: 300 }}
            out:fade={{ duration: 200 }}
        >
            <div class="message loading">
                {@html getLoadingAnimation(modelType)}
            </div>
        </div>
    {/if}
</div>


<style lang="scss">
    .message-list {
        flex: 1;
        overflow-y: auto;
        padding: 1rem;
        display: flex;
        flex-direction: column;
    }

    .message-wrapper {
        display: flex;
        margin-bottom: 1rem;

        &.user {
            justify-content: flex-end;
        }

        &.bot {
            justify-content: flex-start;
        }
    }

    .message {
        max-width: 70%;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        word-wrap: break-word;
        white-space: pre-wrap;
        max-height: 300px;
        overflow-y: auto;
    }

    .user .message {
        background-color: var(--user-message-bg);
        color: var(--background-color);
        border-bottom-right-radius: 0;
    }

    .bot .message {
        background-color: var(--bot-message-bg);
        color: var(--text-color);
        border-bottom-left-radius: 0;
    }

    .loading {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        background-color: var(--bot-message-bg);
        border-radius: 20px;
        max-width: 70%;
    }

    .typing {
        display: flex;
        align-items: center;

        .dot {
            width: 8px;
            height: 8px;
            background-color: var(--text-color);
            border-radius: 50%;
            margin: 0 3px;
            animation: bounce 1.4s infinite ease-in-out both;

            &:nth-child(1) { animation-delay: -0.32s; }
            &:nth-child(2) { animation-delay: -0.16s; }
        }
    }

    .image-loading {
        display: flex;
        flex-direction: column;
        align-items: center;

        .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid var(--text-color);
            border-top: 4px solid var(--primary-color);
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        p {
            margin-top: 0.5rem;
            font-size: 0.9rem;
            color: var(--text-color);
        }
    }

    @keyframes bounce {
        0%, 80%, 100% { transform: scale(0); }
        40% { transform: scale(1); }
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    .image-container {
        position: relative;
        display: inline-block;
        max-width: 70%;
        border-radius: 20px;
        overflow: hidden;

        img {
            max-width: 100%;
            height: auto;
            border-radius: 20px;
        }

        .download-button {
            position: absolute;
            top: 10px;
            right: 10px;
            background-color: rgba(0, 0, 0, 0.5);
            color: white;
            border: none;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 16px;
            transition: background-color 0.3s ease;

            svg {
                width: 1rem;
                height: 1rem;
            }

            &:hover {
                background-color: rgba(0, 0, 0, 0.7);
            }
        }
    }
</style>