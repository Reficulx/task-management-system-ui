import { useEffect, useState } from "react"

// give any type to a variable is like programming with javascript again
export const isFalsy = (value: unknown) => value === 0 ? false : !value // !! converts it to a boolean value

export const isVoid = (value:unknown) => value === undefined || value === null || value === '';

export const cleanObject = (object: {[key:string]: unknown}) => {
  // Object.assign({}, object)
  const result = {...object} 
  Object.keys(result).forEach(key => {
    const value = result[key]
    // eliminate the condition when value is zero
    if (isVoid(value)) {
      delete result[key]
    }
  })
  return result;
}

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // TODO: add callback to dependency will cause infinite loop
  }, [])
}

// use ? to indicate the parameter is optional 
export const useDebounce = ((value: any, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // setup a timeout after the value is changed each time 
    const timeout = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    // run after every this `useEffect` function being called 
    return () => clearTimeout(timeout)
  }, [value, delay])
  
  return debouncedValue;
}) 