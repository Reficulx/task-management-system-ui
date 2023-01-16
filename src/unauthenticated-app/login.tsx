import { useAuth } from "context/auth-context";
import { FormEvent } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

// duck typing: interface oriented programming, interface definition is not strictly required as long as the types are compatible
export const LoginScreen = () => {
  const { login, user } = useAuth();

  // HTMLFormElement extends Element, so FormEvent<Element> should also be fine
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // event.currentTarget.elements[0] does not have a certain type, but we know it is a HTMLInputElement
    // and treat it as a HTMLInputElement
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    login({ username, password });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input type="text" id={"username"} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id={"password"} />
      </div>
      <button type={"submit"}>Login</button>
    </form>
  );
};
