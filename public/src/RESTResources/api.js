import axios from 'axios'

async function send ({ method, path, data, token }) {
  
  try {
    const response = await axios({
      method,
      baseURL: process.env.API_BASE_URL,
      url: path,
      data,
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }
    })
    return new Promise(resolve => resolve(response.data))
  } catch (error) {
    throw error.response.data
    // throw new Error(error.response.data);
    // return new Promise(reject => {return error.response.data})
    // return new Promise(resolve => resolve(error.response.data))
  }
}

export function post (path, data, token = null) {
  return send({ method: 'post', path, data, token })
}

export function put (path, data, token = null) {
  return send({ method: 'put', path, data, token })
}

export async function del (path, token = null) {
  try{
    return await send({ method: 'delete', path, token })
  }
  catch(err){
    throw err;
  }
}

export function get (path, data = {}, token = null) {
  const params = Object.keys(data).map(key => `${key}=${data[key]}`).join('&')
  try{

    return send({
      method: 'get',
      path: `${path}${params ? '?' + params : ''}`,
      token
    })
  }
  catch(error){
    console.log("error = " + error.message);
    throw error;
  }
}
