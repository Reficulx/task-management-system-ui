import { useState } from "react";

interface State<D> {
  error: Error | null;
  data: D | null;
  status: 'idle' | 'loading' | 'error' | 'success'; 
}

const defaultInitialState: State<null> = {
  status: 'idle',
  data: null,
  error: null
}

// initial state will override default initial state here
export const useAsync = <D>(initialState?: State<D>) => {
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState
  })

  const setData = (data:D) => setState({
    data, 
    status: 'success',
    error: null
  })

  const setError = (error: Error) => setState({
    error, 
    status: 'error',
    data: null
  })

  // function `run` triggers the async request
  const run = (promise: Promise<D>) => {
    // if there is no `then` attribute, then it is not a promise
    if (!promise || !promise.then) {
      throw new Error('Please give Promise type data!')
    }
    setState({...state, status: 'loading'})
    return promise.then(data => {
      setData(data)
      return data
    }).catch(error => {
      setError(error)
      return error
    })
  }

  return {
    isIdle: state.status === 'idle',
    isLoading: state.status === 'loading',
    isError: state.status === 'error',
    isSuccess: state.status === 'success',
    run, 
    setData,
    setError,
    ...state
  }
}


