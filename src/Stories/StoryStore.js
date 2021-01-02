import {writable} from 'svelte/store';

function getStore(inputRestStore){
  let subscribeFunctions = [];
  let nextId = 1;
  let stories = writable(new Promise(() => {}));
  let restStore = inputRestStore;

  if(stories){
    nextId += stories.length;
  }

  async function getStories(){
    try{
      const localStories = await restStore.getCollection('stories') 
      return localStories;
    }
    catch(err){
      throw err;
    } 
  }

  function set(newStories){
    stories = newStories;
    subscribeFunctions.forEach(func => func(newStories));
  }

  function update(callback){
    set(callback(stories));
  }

  function subscribe(callback){
    subscribeFunctions.push(callback);
    callback(stories);

    return function(){
      subscribeFunctions = subscribeFunctions.filter(func => func !== callback);
    }
  }

  function addStory(newStory){
    update((stories) => {
      // IF:DEBUG:console.log("inside update stories");
      newStory.id = getNextId();
      // IF:DEBUG:console.log("newStory.id = " + newStory.id);
      stories.push(newStory);
      // IF:DEBUG:console.log("stories = " + stories);
      // IF:DEBUG:console.log("stories = " + JSON.stringify(stories));
      // const Story = getStoryModel();
      // IF:DEBUG:console.log("StoryModel = " + Story);

      // try{
      //   const story = new Story({});
      //   stories.push(story);
      //   console.log("StoryStore.js: don't forget to update the database");
      // }
      // catch(err){
      //   // IF:DEBUG:console.log("err = " + err);
      //   throw err;
      // }
      // IF:DEBUG:console.log("story = " + story);
      // IF:DEBUG:console.log("story = " + JSON.stringify(story));
      return stories;
    })
  }

  async function deleteStory(id){

    // update((stories) => {
    //   let storyData = Promise.resolve(restStore.getCollection("stories"));

    //   console.log("deleteStory: stories = " + JSON.stringify(stories))
    //   stories = stories.filter((story) => {
    //     story.id != id;
    //   })

    //   return stories;
    // })

    await restStore.deleteItem("stories", id);
  }

  function getStory(id) {
    const story = stories.find(j => j.id === id);
    return story   
  }

  function getNextId(){
    return nextId++;
  }

  // return {set, update, subscribe, addStory, deleteStory, getStory, getStoryModel};
  return {set, update, subscribe, addStory, deleteStory, getStory, getStories};
}

function createStoryStore(restStore){
  return getStore(restStore);
}
export const CreateStoryStore = createStoryStore;