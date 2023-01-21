import { useUrlQueryParam } from "utils/url";

export const useTasksSearchParams = () => {
  // title is task title
  // username is the name of the users/assignee of the tasks
  const [param, setParam] = useUrlQueryParam(["username", "title"]);
  // f param.userId is a number: return {...param, userId: Number(param.userId) || undefined }
  return [
    {...param},
    setParam
    ]
}