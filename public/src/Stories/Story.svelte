<script>
  import {formatDistanceToNow} from 'date-fns'

  export let story
  export let Voter
  export let inList = false
  // export let onUpvote;
  export let onDelete;

  $: domain = story.type === 'link' ? new URL(story.content).hostname : 'self'

  $: storyLink = `/stories/${story._id}`

  $: link = story.type === 'link' ? story.content : storyLink

  $: commentsCountTitle = story.commentsCount === 0
    ? 'no comments'
    : `${story.commentsCount} comment${story.commentsCount > 1 ? 's' : ''}`

  $: date = formatDistanceToNow(new Date(story.createdAt), { addSuffix: true })

  $: isStoryOwner = true; //story.user._id === ($session.user && $session.user._id)

  function upvote() {
    story.score++
    // api.stories.upvoteStory({ storyId: story._id })
  }

  function deleteStory (id) {
    onDelete(id);
  }
</script>

<style>
  .story-item {
    color: blue;
  }
  .story-item .details {
	display: flex;
	align-items: center;
}
</style>

<li class="story-item">
  <Voter score={story.score} on:upvote={upvote} ></Voter>
  <div class="main">
    <div class="details">
      <a class="title" href={link} rel="prefetch"> {story.title} </a>
      <span class="domain"> {domain} </span>
      {#if !inList && isStoryOwner}
        <div class="story-actions">
          <a class="story-action-button" href={`stories/${story._id}/edit`}>edit</a>
          <span class="story-action-button" on:click={() => deleteStory(story.id)}>
            delete
          </span>
        </div>
      {/if}
    </div>
    <div class="byline">
      by
      {story.user.username}
      {date}
      |
      <a class="comments-link" href={storyLink} rel="prefetch">
        {commentsCountTitle}
      </a>
    </div>
  </div>
</li>
