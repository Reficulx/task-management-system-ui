import { Button, Form, Input } from "antd";
import { useAuth } from "context/auth-context";

const apiUrl = process.env.REACT_APP_API_URL;

// duck typing: interface oriented programming, interface definition is not strictly required as long as the types are compatible
export const RegisterScreen = () => {
  const { register, user } = useAuth();

  // HTMLFormElement extends Element, so FormEvent<Element> should also be fine
  const handleSubmit = (values: {
    username: string;
    password: string;
    email: string;
  }) => {
    register(values);
  };
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"email"}
        rules={[{ required: true, message: "Please enter your email!" }]}
      >
        <Input placeholder={"Email"} type="text" id={"email"} />
      </Form.Item>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "Please enter your username!" }]}
      >
        <Input placeholder={"Username"} type="text" id={"username"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "Please enter your password!" }]}
      >
        <Input placeholder={"Password"} type="password" id={"password"} />
      </Form.Item>
      <Button htmlType={"submit"} type={"primary"}>
        Register
      </Button>
    </Form>
  );
};
