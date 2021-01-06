<script>
  import { onMount } from 'svelte'
  export let goto
  export let restStore
  export let storyId;
  export let session;

  let story = {};

  let inProgress = false

  async function submit() {
    console.log('submit')
    inProgress = true
    const data = storyId
      ? await restStore.updateItem('stories', storyId, story)
      : alert('Error: should never be possible!!!')
    goto(`/stories/${data._id}`)
  }

  export const buttons = [
    {
      value: 'link',
      title: 'Link'
    },
    {
      value: 'text',
      title: 'Text'
    }
  ]

  export let disabled = false

  onMount(async () => {
    story = await restStore.getItem('stories', storyId);

    if(session.user._id !== story.user._id){
      // return this.error(404, 'Not found');
      console.log('component:Stories/edit.svelte: user not edit user');
    }
    console.log("JSON.stringify(story) = " + JSON.stringify(story))
  })
</script>

<svelte:head>
  <title>Create a new story</title>
</svelte:head>
<form class="story-form" on:submit|preventDefault={submit}>
  <input
    class="text-input"
    bind:value={story.title}
    type="text"
    placeholder="Title"
    required />

  <div class="button-group" class:disabled>
    {#each buttons as button}
      <button
        class="button"
        type="button"
        class:active={button.value === story.type}
        on:click={() => {
          return !disabled ? (story.type = button.value) : ''
        }}>
        {button.title}
      </button>
    {/each}
  </div>
  {#if story.type === 'link'}
    <input
      class="text-input link-input content-input"
      bind:value={story.content}
      type="url"
      placeholder="URL"
      required />
  {:else}
    <textarea
      class="content-text-input content-input"
      bind:value={story.content}
      placeholder="Text (optional)" ></textarea>
  {/if}
  <button class="primary-button submit-button" disabled={inProgress}>
    {#if story._id}SAVE{:else}POST{/if}
  </button>
</form>


<!-- {#await $story}
<img alt="loading" src="loading-circles.gif" />
{:then test}
<form class="story-form" on:submit|preventDefault={submit}>
  <input
    class="text-input"
    bind:value={story.title}
    type="text"
    placeholder="Title"
    required />

  <div class="button-group" class:disabled>
    {#each buttons as button}
      <button
        class="button"
        type="button"
        class:active={button.value === story.type}
        on:click={() => {
          return !disabled ? (story.type = button.value) : ''
        }}>
        {button.title}
      </button>
    {/each}
  </div>
  {#if story.type === 'link'}
    <input
      class="text-input link-input content-input"
      bind:value={story.content}
      type="url"
      placeholder="URL"
      required />
  {:else}
    <textarea
      class="content-text-input content-input"
      bind:value={story.content}
      placeholder="Text (optional)" ></textarea>
  {/if}
  <button class="primary-button submit-button" disabled={inProgress}>
    {#if story._id}SAVE{:else}POST{/if}
  </button>
</form>
{:catch error}
<h1>Error accessing Stories!!!</h1>
<h2>{error}</h2>
{/await} -->