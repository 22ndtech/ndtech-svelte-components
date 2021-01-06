
import { writable } from 'svelte/store'
import * as api from './api'
import {Context} from '../Context/Context'

const cache = new Map();

function makeStore() {
  const store = writable(new Promise(() => { }))

  async function filter(arr, callback) {
    const fail = Symbol()
    return (await Promise.all(arr.map(async item => (await callback(item)) ? item : fail))).filter(i => i !== fail)
  }


  async function getCollection(resourceName) {

    if (cache.has(resourceName)) {
      store.set(Promise.resolve(cache.get(resourceName)))
    }

    const load = async () => {
      try{

        const response = await api.get("http://localhost:5000/" + resourceName, {}, Context.user.token)
        const data = response.data
        cache.set(resourceName, data)
        store.set(Promise.resolve(data))
      }
      catch(err){
        throw err;
      }
    }

    try{
      await load()
    }
    catch(e){
      console.log("Error in RESTStore:getCollection: " + e.message);
      throw e;
    }

    return store
  }

  async function deleteItem(resourceName, resourceId) {

    if (Context.user) {
      try {

        if (cache.has(resourceName)) {
          let resourceArray = cache.get(resourceName)

          let filteredArray = await filter(resourceArray, async (resource) => {
            var keepRecord = resource.id != resourceId;
            if (!keepRecord) {
              try {
                await api.del("http://localhost:5000/" + resourceName + "/" + resourceId, Context.user.token);
                console.log("keepRecord = " + keepRecord)
              }
              catch (e) {
                throw e;
              }
            }
            return keepRecord;
          });

          cache.set(resourceName, filteredArray)
          store.set(filteredArray)
        }

      }
      catch (err) {
        throw "Error deleting " + resourceId + " from " + resourceName + ": " + err.message
      }
    }
    else {
      throw "must login before deleting items"
    }

  }

  async function updateItem(resourceName, resourceId, resource) {

    if (Context.user) {
      try {

        if (cache.has(resourceName)) {
          let resourceArray = cache.get(resourceName)

          for(var i = 0; i < resourceArray.length; i++){
            const resource = resourceArray[i];
            if(resource._id == resourceId){
              resourceArray[i] = resource;
              break;
            }
          }

              try {

                await api.put("http://localhost:5000/" + resourceName + "/" + resourceId, resource, Context.user.token);
              }
              catch (e) {
                console.log("RESTStore.updateItem: error calling api.put: e = " + e);
                throw e;
              }

          // cache.set(resourceName, filteredArray)
          // store.set(filteredArray)
          console.log("logging resource = " + resource + " to get the linter off my back until I implement the real functionality");
          return resource;
        }

      }
      catch (err) {
        throw "Error deleting " + resourceId + " from " + resourceName + ": " + err.message
      }
    }
    else {
      throw "must login before updating items"
    }

  }

  async function createItem(resourceName, resource) {

    if (Context.user) {
      try {

        if (cache.has(resourceName)) {
          const resourceArray = cache.get(resourceName)
          const newResource = await api.post("http://localhost:5000/" + resourceName, resource, Context.user.token);
          resourceArray.push(newResource);

          cache.set(resourceName, resourceArray)
          store.set(resourceArray)

          return newResource;
        }

      }
      catch (err) {
        throw "Error deleting " + resource._id + " from " + resourceName + ": " + err.message
      }
    }
    else {
      throw "must login before updating items"
    }

  }

  async function getItem(resourceName, resourceId) {

    if (Context.user) {

        if (cache.has(resourceName)) {
          let resourceArray = cache.get(resourceName)

          return resourceArray.find(element => element._id == resourceId)
        }

    }
    else {
      throw "must login before getting items"
    }

  }


  return { getCollection, deleteItem, updateItem, createItem, getItem }
}

export const RESTStore = makeStore();