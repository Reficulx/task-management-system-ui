import { useState } from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useDebounce, useDocumentTitle } from "utils";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useTasks } from "utils/task";
import { useUsers } from "utils/user";
import { useUrlQueryParam } from "utils/url";

export const ProjectListScreen = () => {
  // title is task title
  // username is the name of the users/assignee of the tasks
  const [, setParam] = useState({
    username: "",
    title: "",
  });

  const [param] = useUrlQueryParam(["username", "title"]);
  const debouncedParam = useDebounce(param, 2002);
  const { isLoading, error, data: list } = useTasks(debouncedParam); // rename data as list using `data:list`
  const { data: users } = useUsers();

  useDocumentTitle("Tasks List", false);
  return (
    <Container>
      <h1>Tasks List</h1>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} users={users || []} dataSource={list || []} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
