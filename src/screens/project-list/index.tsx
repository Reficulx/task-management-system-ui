import { useEffect, useState } from "react";
import { SearchPanel, User } from "./search-panel";
import { List } from "./list";
import { cleanObject, useDebounce, useMount } from "utils";
import { useHttp } from "utils/http";
import qs from "qs";
import styled from "@emotion/styled";

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
  console.log(users);
  useEffect(() => {
    client({
      endpoint: `tasks/${qs.stringify(debouncedParam)}`,
      data: debouncedParam,
    }).then(setList);
  }, [debouncedParam]);

  useMount(() => {
    client({ endpoint: "users/all" }).then(setUsers);
  });
  return (
    <Container>
      <h1>Tasks List</h1>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
