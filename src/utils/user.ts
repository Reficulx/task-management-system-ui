import { useEffect } from "react";
import { User } from "screens/task-list/search-panel"
import { useHttp } from "./http"
import { useAsync } from "./use-async";

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();
  const {run, ...result} = useAsync<User[]>()
  useEffect(() => {
    run(client({ endpoint: "users/all" }));
  }, [param])
  return result;
}