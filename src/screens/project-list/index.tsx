import { useEffect, useState } from "react";
import { SearchPanel, User } from "./search-panel";
import { List } from "./list";
import { cleanObject, useDebounce, useMount } from "utils";
import { useHttp } from "utils/http";
import qs from "qs";

const apiUrl = process.env.REACT_APP_API_URL; // `npm start` calls .env.development; `npm run build` calls .env
export const ProjectListScreen = () => {
  // title is task title
  // username is the name of the users/assignee of the tasks
  const [param, setParam] = useState({
    username: "",
    title: "",
  });
  const [users, setUsers] = useState<User[]>([]);
  const [list, setList] = useState([]);
  const client = useHttp();

  const debouncedParam = useDebounce(param, 2000);

  useEffect(() => {
    client({ endpoint: `tasks/${qs.stringify(debouncedParam)}`, data: debouncedParam }).then(setList);
  }, [debouncedParam]);

  useMount(() => {
    client({ endpoint: "users/all" }).then(setUsers);
  });
  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </div>
  );
};
