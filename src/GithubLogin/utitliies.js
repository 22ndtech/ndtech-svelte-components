import * as api from '../RESTResources/api'

export async function GetUser(token){
  var user = new Promise(() => {});
  try{
    const resp = await api.get("http://localhost:5000/GetLoggedInUser", {}, token);
    const u = await resp.user;
    user = Promise.resolve(u);
  }
  catch(err){
    return false;
  }
  return user;
}