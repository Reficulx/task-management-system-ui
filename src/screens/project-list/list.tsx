import { Table, TableProps } from "antd";
import dayjs from "dayjs";
import { User } from "./search-panel";

export interface Task {
  id: string;
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
}

export const List = ({ users, ...props }: ListProps) => {
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: "Task Name",
          dataIndex: "title",
          sorter: (a, b) => a.title.localeCompare(b.title),
        },
        {
          title: "Description",
          dataIndex: "description",
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
          title: "User Name",
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
