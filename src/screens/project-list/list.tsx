import { Table } from "antd";
import dayjs from "dayjs";
import { User } from "./search-panel";

interface Task {
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
interface ListProps {
  users: User[];
  list: Task[];
}
export const List = ({ list, users }: ListProps) => {
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
                {task.creationTime ? dayjs(task.creationTime).format('YYYY-MM-DD') : "Unknown"}
              </span>
            )
          }
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
      dataSource={list}
    />
  );
};
