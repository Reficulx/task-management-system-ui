import { Table } from "antd";
import { User } from "./search-panel";

interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
}
interface ListProps {
  users: User[];
  list: Project[];
}
export const List = ({ list, users }: ListProps) => {
  return <Table pagination={false} columns={[{
    title: 'Task Name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name)
  }, {
    title: 'User Name',
    render(value, project) {
      return <span>
        {users.find((user: User) => user.id === project.personId)?.name || "Unknown"}
      </span>
    }
  }]} dataSource={list} />;
};
