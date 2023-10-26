import { TIME_LIMIT } from "./config.js";

const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };

export const FETCH_DATA = async function (url) {
    try{
        const res = await Promise.race([fetch(url), timeout(TIME_LIMIT)]);
        const data = await res.json();
      
        if (!res.ok) {
          throw new Error(`${data.message}`);
      }
      return data;

    } catch(err){
        throw err;
    }
       
};

export const sendJSON = async function (url, uploadData) {
  try{
    const fetchPromise = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData)
    });
    
      const res = await Promise.race([fetchPromise, timeout(TIME_LIMIT)]);
      const data = await res.json();
    
      if (!res.ok) {
        throw new Error(`${data.message}`);
    }
    return data;

  } catch(err){
      throw err;
  }
     
};
