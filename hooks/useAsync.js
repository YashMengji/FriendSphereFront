import {useEffect, useState, useCallback} from "react"

export function useAsync(func, dependencies = []){
  const {execute, ...state} = useAsyncInternal(func, dependencies, true);
  useEffect(() => {
    execute()
  }, [execute]);

  return state
}

// Doesn't run automatically
export function useAsyncFn(func, dependencies = []){
  return useAsyncInternal(func, dependencies, false);
}

function useAsyncInternal(func, dependencies, initialLoading = false){
  const [loading, setLoading] = useState(initialLoading);
  const [value, setValue] = useState();
  const [error, setError] = useState();

  const execute = useCallback((...params) => {
    setLoading(true)
    return func(...params).then(data => {
      setValue(data);
      setError(undefined);
      return data;
    }).catch(error => {
      setValue(undefined);
      setError(error);
      return Promise.reject(error);
    }).finally(() => {
      setLoading(false);
    });
  }, dependencies);
  return {execute, loading, error, value}
}