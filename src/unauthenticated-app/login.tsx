import { useAuth } from "context/auth-context";
import { Button, Form, Input } from "antd";
import { LongButton } from "unauthenticated-app";
import { useAsync } from "utils/use-async";

const apiUrl = process.env.REACT_APP_API_URL;

// duck typing: interface oriented programming, interface definition is not strictly required as long as the types are compatible
export const LoginScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { login, user } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  // HTMLFormElement extends Element, so FormEvent<Element> should also be fine
  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    // when involving async requests, use try catch to update the error state immediately
    // setError is async, which means that error returned by useAsync is later than the catch or next statement to be executed in the function
    try {
      await run(login(values));
    } catch (e) {
      console.log(e);
      onError(e as Error);
    }
  };
  return (
    <Form onFinish={handleSubmit}>
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
      <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
        Login
      </LongButton>
    </Form>
  );
};
