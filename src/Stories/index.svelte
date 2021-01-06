<script>
  import { writable } from 'svelte/store'
  import { onMount } from 'svelte'
  import Story from './Story.svelte'
  import { RESTStore } from '../RESTResources/RESTStore'
  import { CreateStoryStore } from './StoryStore'
  import { Context } from '../Context/Context'

  export let Voter
  export let session
  // export let imagePath

  let stories = writable(new Promise(() => {}))
  let StoryStore

  onMount(async () => {
    StoryStore = CreateStoryStore(RESTStore)
    stories = await StoryStore.getStories()
    console.log('stories = ' + stories)
    // console.log('JSON.stringify(stories) = ' + JSON.stringify(stories))
  })

  let upVote = () => {
    console.log('upvoted!!!')
  }

  let onDelete = id => {
    console.log('onDelete')
    StoryStore.deleteStory(id)
  }
</script>

{#if $Context.user}
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
