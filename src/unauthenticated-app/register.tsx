import { Button, Form, Input } from "antd";
import { useAuth } from "context/auth-context";
import { LongButton } from "unauthenticated-app";
import { useAsync } from "utils/use-async";

const apiUrl = process.env.REACT_APP_API_URL;

// duck typing: interface oriented programming, interface definition is not strictly required as long as the types are compatible
export const RegisterScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { register, user } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  // HTMLFormElement extends Element, so FormEvent<Element> should also be fine
  const handleSubmit = async ({
    cpassword,
    ...values
  }: {
    username: string;
    password: string;
    email: string;
    cpassword: string;
  }) => {
    if (cpassword !== values.password) {
      onError(new Error("The passwords you entered does not match!"));
    }
    try {
      await run(register(values));
    } catch (e) {
      onError(e as Error);
    }
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
      <Form.Item
        name={"cpassword"}
        rules={[{ required: true, message: "Please confirm your password!" }]}
      >
        <Input
          placeholder={"Confirm Your Password"}
          type="password"
          id={"cpassword"}
        />
      </Form.Item>
      <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
        Register
      </LongButton>
    </Form>
  );
};
