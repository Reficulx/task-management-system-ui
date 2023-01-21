/**
 *  return the parameters from a url
 */

import { useSearchParams } from "react-router-dom"

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParam] = useSearchParams();
  return [
    keys.reduce((prev, key) => {
      return {...prev, [key]:searchParams.get(key)} || ''
    }, {} as { [key in K]: string}),
    setSearchParam,
  ] as const
}
