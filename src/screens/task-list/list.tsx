import { Table, TableProps } from "antd";
import { Pin } from "components/pin";
import dayjs from "dayjs";
// the relationship between react-router and react-router-dom is similar to react and react-dom/react-native/...
import { Link } from "react-router-dom";
import { useEditTask } from "utils/task";
import { User } from "./search-panel";

export interface Task {
  id: string;
  isPinned: boolean;
  username: string;
  title: string;
  description: string;
  creationTime: Date;
  startTime: Date;
  deadline: Date;
  completionTime: Date;
  status: string;
}
// TableProps<RecordType>, Task is passed in props into <Table /> component by using it as RecordType
// in the meantime, the parameters passed into <List /> are also stored in props, which is used as parameters using {...props} in <Table /> component
// using props makes passing parameters to <List /> more convenient
interface ListProps extends TableProps<Task> {
  users: User[];
  refresh?: () => void;
}

export const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditTask();
  // functional programming
  const pinProject = (id: string, username: string) => (isPinned: boolean) =>
    mutate({ id, username, isPinned }).then(props.refresh);
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, task) {
            return (
              <Pin
                checked={task.isPinned}
                onCheckedChange={pinProject(task.id, task.username)}
              />
            );
          },
        },
        {
          title: "Task Name",
          dataIndex: "title",
          sorter: (a, b) => a.title.localeCompare(b.title),
          render(value, task) {
            return <Link to={task.id}>{task.title}</Link>;
          },
        },
        {
          title: "Creation Time",
          render(value, task) {
            return (
              <span>
                {task.creationTime
                  ? dayjs(task.creationTime).format("YYYY-MM-DD")
                  : "Unknown"}
              </span>
            );
          },
        },
        {
          title: "Assignee",
          render(value, task) {
            return (
              <span>
                {users.find((user: User) => user.username === task.username)
                  ?.username || "Unknown"}
              </span>
            );
          },
        },
        {
          title: "Contact Email",
          render(value, task) {
            return (
              <span>
                {users.find((user: User) => user.username === task.username)
                  ?.email || "Unknown"}
              </span>
            );
          },
        },
      ]}
      {...props}
    />
  );
};
