import { Button, Card } from "antd";
import { useState } from "react";
import { LoginScreen } from "./login";
import { RegisterScreen } from "./register";

export const UnauthenticatedApp = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card>
        {isRegistering ? <RegisterScreen /> : <LoginScreen />}
        <Button onClick={() => setIsRegistering(!isRegistering)}>
          Change to {isRegistering ? "Login" : "Register"}
        </Button>
      </Card>
    </div>
  );
};
