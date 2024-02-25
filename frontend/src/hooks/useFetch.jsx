import { useEffect, useReducer } from 'react';

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

function reducer(state, { type, payload }) {
  switch (type) {
    case 'send-request':
      return { ...state, isLoading: true };

    case 'load-data':
      return { ...state, data: [...state.data, payload], isLoading: false };

    case 'error':
      return { ...initialState, data: state.data, error: payload };

    case 'reset':
      return initialState;

    default:
      throw new Error('Unknown action dispatched');
  }
}

const BASE_URL = 'http://localhost:8080/api/v1/courses/';
function useFetch(course) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(
    function () {
      async function getData() {
        if (course === '') {
          dispatch({ type: 'reset' });
          return;
        }
        const res = await fetch(BASE_URL + course);
        const data = await res.json();

        if (data.status === 'failed') throw new Error('No course found');
        dispatch({ type: 'load-data', payload: data.data });
      }

      try {
        dispatch({ type: 'send-request' });
        getData();
      } catch (error) {
        dispatch({ type: 'error', payload: error.error });
      }
    },
    [course],
  );
  return state;
}

export default useFetch;
