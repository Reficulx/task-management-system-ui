import { Form, Input, Select } from "antd";

export interface User {
  id: string;
  username: string;
  email: string;
  accessToken: string;
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
    <Form style={{ marginBottom: "2rem" }} layout={"inline"}>
      <Form.Item>
        {/*setParam(Object.assign({}, param, {name:evt.target.value}))*/}
        <Input
          placeholder="Taks Title"
          type="text"
          value={param.title}
          onChange={(event) =>
            setParam({
              ...param,
              title: event.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item>
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
      </Form.Item>
    </Form>
  );
};
