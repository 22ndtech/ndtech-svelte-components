import {writable} from 'svelte/store';
import {Context} from '../Context/Context'
import {RESTStore} from '../RESTResources/RESTStore'

Context.storyStore = getStore();

function getStore(){
  let subscribeFunctions = [];
  let nextId = 1;
  let stories = writable([new Promise(() => {})]);

  if(stories){
    nextId += stories.length;
  }

  async function getStories(){
    try{
      const localStories = await RESTStore.getCollection('stories');
      stories.set(Promise.resolve(localStories));
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
    console.log("getNextId() = " + getNextId());
    return RESTStore.createItem("stories", newStory);
  }

  async function deleteStory(id){
    await RESTStore.deleteItem("stories", id);
  }

  async function getStory(id) {

    return await RESTStore.getItem('stories', id);
  }

  function getNextId(){
    return nextId++;
  }

  // return {set, update, subscribe, addStory, deleteStory, getStory, getStoryModel};
  return {set, update, subscribe, addStory, deleteStory, getStory, getStories};
}

function createStoryStore(){
  return Context.storyStore;
}
export const CreateStoryStore = createStoryStore;
export const StoryStore = Context.storyStore;