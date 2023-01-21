import { Task } from "../screens/task-list/list";
import { useEffect } from "react";
import { useHttp } from "utils/http";
import { useAsync } from "./use-async";
import qs from "qs";

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Task[]>(); // rename data as list using `data:list`

  useEffect(() => {
    run(
      client({
        endpoint: `tasks/${qs.stringify(param)}`,
        data: param,
      })
    ); // client() function returns a Promise so it could be passed to run function
  }, [param]);

  return result;
}