import { Table } from "antd";
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
      ]}
      dataSource={list}
    />
  );
};
