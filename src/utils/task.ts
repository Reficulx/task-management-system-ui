import { Task } from "../screens/task-list/list";
import { useEffect } from "react";
import { useHttp } from "utils/http";
import { useAsync } from "./use-async";
import qs from "qs";
import { useAuth } from "context/auth-context";

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Task[]>(); // rename data as list using `data:list`

  const fetchTasks = () => client({endpoint: `tasks/${qs.stringify(param)}`, data:param})

  useEffect(() => {
    run(fetchTasks(), {
      retry: fetchTasks
    }); // client() function returns a Promise so it could be passed to run function
  }, [param]);

  return result;
}


// TODO: work with backend to improve the request format
// currently, username must be included, find a way to ensure this
export const useEditTask = () => {
  const {run, ...asyncResult} = useAsync();
  const client = useHttp();
  const {user} = useAuth();
  const mutate = (params: Partial<Task>) => {
    return run(client({
      endpoint: `tasks/update/id=${params.id}`,
      data: {...params},
      method: "POST"
    }))
  }
  return {
    mutate,
    ...asyncResult
  }

}

export const useAddTask = () => {
  const {run, ...asyncResult} = useAsync()
  const client = useHttp()
  const mutate = (params: Partial<Task>) => {
    return run(client({
      endpoint: `tasks/create`,
      data: params,
      method: "POST"
    }))
  }
  return {
    mutate,
    ...asyncResult
  }
}