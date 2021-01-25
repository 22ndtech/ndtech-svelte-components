<script>
  import { writable } from 'svelte/store'
  import { onMount } from 'svelte'
  import Story from './Story.svelte'
  import { RESTStore } from '../RESTResources/RESTStore'
  import { CreateStoryStore } from './StoryStore'
  import GitHubLoginPage from '../GithubLogin/loginPage.svelte'

  export let Voter

  let stories = writable(new Promise(() => {}))
  let StoryStore

  onMount(async () => {
    StoryStore = CreateStoryStore(RESTStore)
    try{
      stories = await StoryStore.getStories()
    }
    catch(err){
      console.log("3");
      stories = Promise.reject(err);
    }
  })

  let upVote = () => {
    console.log('upvoted!!!')
  }

  let onDelete = id => {
    console.log('onDelete')
    StoryStore.deleteStory(id)
  }
</script>

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

    <a href="stories/create" class="new-story-button primary-button">
      New Story
    </a>
  {:catch error}
  <h1>We apologize for the inconvenience but that functionality requires logging in with your FREE GitHub account.</h1>
  <GitHubLoginPage cssClass="login-link" clientId="2d4079dfff80ceb2c3a7" />
  {/await}

