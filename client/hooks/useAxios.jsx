import React, {useState, useEffect} from 'react';
import axios from "axios"
export const useAxios = (url) =>{
  const [state, setState] = useState([]) 
useEffect(() =>{
    const CancelToken = axios.CancelToken;
      const source = CancelToken.source();
      const loadData = () => {
        try {
          axios
            .get(url, { cancelToken: source.token })
            .then((res) => {
              setState(res.data);
            });
        } catch (error) {
          if (axios.isCancel(error)) {
            console.log("cancelled");
          } else {
            throw error;
          }
        }
      };
  
      loadData();
      return () => {
        console.log("cleaning");
        source.cancel();
      };
  },[url, setState]);
return state;
} 