/* eslint-disable no-unused-vars */
import { useRecoilState } from 'recoil';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { logState } from '../atom';
export const useAxios = (url) => {
  const [state, setState] = useRecoilState(logState);
  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const loadData = () => {
      try {
        axios.get(url, { cancelToken: source.token }).then((res) => {
          setState(res.data.hits.hits);
        });
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Error in useAxios useEffect: cancelled. error: ', error);
        } else {
          throw error;
        }
      }
    };

    loadData();
    return () => {
      source.cancel();
    };
  }, [url, setState]);
  return state;
};
