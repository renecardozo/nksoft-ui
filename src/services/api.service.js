const APIURL = process.env.REACT_APP_API_URL;
export const APISERVICE = {
  get: async (url) => {
    try {
      const response = await fetch(`${APIURL + url}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Could not fetch data:", error);
    }
  },
  post: async (url, body) => {
    try{
      const response = await fetch(`${APIURL + url}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      return data;
    }catch (error) {      
      console.error(error);
    }
  },
  delete: async (url) => {
    try{
      const response = await fetch(`${APIURL + url}`, {
        method: "DELETE",
      });
      const data = await response.json();
      return data;
    }catch (error) {      
      console.error(error);
    }
  },
};
