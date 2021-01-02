<script context="module">
  let inputParams;

  export async function preload({ params }, session) {
    console.log('JSON.stringify(params) = ' + JSON.stringify(params))
    inputParams = params;
    if (!session.user) {
      // return this.redirect(302, 'login')
      console.log('JSON.stringify(session) = ' + JSON.stringify(session))
    }
    // let story = restStore.
  }
  console.log("logging inputParams = " + inputParams + " to get the linter off my back while I figure out why it is yelling");
</script>

<script>
  import { onMount } from 'svelte'
  export let goto
  export let restStore

  let story = { title: '', type: 'text', content: '' };
  let inProgress = false

  async function submit() {
    console.log('submit')
    inProgress = true
    const data = story._id
      ? await restStore.updateItem('stories', story._id, story)
      : alert('wtf')
    goto(`/story/${data._id}`)
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
    console.log('wtf');
    // story = await restStore.getItem("stories", inputParams.id)
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
