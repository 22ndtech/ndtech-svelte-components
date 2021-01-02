<script>
  import { writable } from 'svelte/store'
  import { onMount } from 'svelte'
  import Story from './Story.svelte'
  import { CreateStoryStore } from './StoryStore'

  export let Voter
  export let restStore
  export let session
  // export let imagePath

  let stories = writable(new Promise(() => {}))
  let StoryStore

  onMount(async () => {
    StoryStore = CreateStoryStore(restStore)
    stories = await StoryStore.getStories()
    console.log('stories = ' + stories)
  })

  let upVote = () => {
    console.log('upvoted!!!')
  }

  let onDelete = id => {
    console.log('onDelete')
    StoryStore.deleteStory(id)
  }
</script>

{#if $session.user}
  {#await $stories}
    <img alt="loading" src="loading-circles.gif" />
  {:then $stories}
    <h1>Stories</h1>
    <ul>
      {#each $stories as story}
        <Story {story} {Voter} {onDelete} onUpvote={upVote} />
        <br />
      {/each}
    </ul>
  {:catch error}
    <h1>Error accessing Stories!!!</h1>
    <h2>{error}</h2>
  {/await}

  <a href="stories/create" class="new-story-button primary-button">
    New Story
  </a>
{/if}
