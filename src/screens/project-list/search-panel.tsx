import { Input, Select } from "antd";

export interface User {
  id: string;
  username: string;
  email: string;
  accessToken: string;
  tokenType: string;
  roles: string[];
}

interface SearchPanelProps {
  users: User[];
  param: {
    username: string;
    title: string;
  };
  setParam: (param: SearchPanelProps["param"]) => void;
}

export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
  return (
    <form>
      <div>
        {/*setParam(Object.assign({}, param, {name:evt.target.value}))*/}
        <Input
          type="text"
          value={param.title}
          onChange={(event) =>
            setParam({
              ...param,
              title: event.target.value,
            })
          }
        />
        <Select
          value={param.username}
          onChange={(value) =>
            setParam({
              ...param,
              username: value,
            })
          }
        >
          <Select.Option value={""}>Person in Charge</Select.Option>
          {users.map((user) => (
            <Select.Option key={user.username} value={user.username}>
              {user.username}
            </Select.Option>
          ))}
        </Select>
      </div>
    </form>
  );
};
