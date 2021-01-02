<script context="module">
  // export function preload (page, session) {
  //   if (!session.user) {
  //     // return this.redirect(302, 'login')
  //     console.log("JSON.stringify(session) = " + JSON.stringify(session))
  //   }
  // }
</script>

<svelte:head>
  <title>Create a new story</title>
</svelte:head>

<script>
  export let goto;
  // export let stores;
  // export let api;
  // export let ButtonGroup;
  export let restStore;
  
  export let story = { title: '', type: 'text', content: '' }
  let inProgress = false;

  async function submit () {
    console.log("submit");
    inProgress = true
    const data = story._id ? await restStore.updateItem("stories", story._id, story) : await restStore.createItem("stories", story)
    //   ? await api.stories.updateStory({
    //     storyId: story._id,
    //     story,
    //     token: $session.user.token
    //   })
    //   : await api.stories.createStory({
    //     story,
    //     token: $session.user.token
    //   })
    goto(`/story/${data._id}`)
  }

  export const buttons=[
      {
        value: 'link',
        title: 'Link'
      },
      {
        value: 'text',
        title: 'Text'
      }
    ];

  export let disabled = false
</script>

<form
  class="story-form"
  on:submit|preventDefault="{submit}"
>
  <input
    class="text-input"
    bind:value="{story.title}"
    type="text"
    placeholder="Title"
    required
  >
  <!-- <ButtonGroup
    bind:value="{story.type}"
    disabled="{story._id}"
    buttons="{[
      {
        value: 'link',
        title: 'Link'
      },
      {
        value: 'text',
        title: 'Text'
      }
    ]}"
  /> -->
  <div
  class="button-group"
  class:disabled="{disabled}"
>
  {#each buttons as button}
    <button
      class="button"
      type="button"
      class:active="{button.value === story.type}"
      on:click="{() => {
        return !disabled ? story.type = button.value : ''}
      }"
    >
      {button.title}
    </button>
  {/each}
</div>
  {#if story.type === 'link'}
    <input
      class="text-input link-input content-input"
      bind:value="{story.content}"
      type="url"
      placeholder="URL"
      required
    >
  {:else}
    <textarea
      class="content-text-input content-input"
      bind:value="{story.content}"
      placeholder="Text (optional)"
    ></textarea>
  {/if}
  <button
    class="primary-button submit-button"
    disabled="{inProgress}"
  >
    {#if story._id}
      SAVE
    {:else}
      POST
    {/if}
  </button>
</form>
