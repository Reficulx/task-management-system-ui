import { Button, Card, Divider } from "antd";
import { useState } from "react";
import { LoginScreen } from "./login";
import { RegisterScreen } from "./register";
import styled from "@emotion/styled";
import logo from "assets/logo.svg";
import left from "assets/left.svg";
import right from "assets/right.svg";

// This component is the entrance for the login/register screens
export const UnauthenticatedApp = () => {
  const [isRegistered, setIsRegistered] = useState(false);

  return (
    <Container>
      <Header />
      <Background />
      <ShadowCard>
        <Title>{!isRegistered ? "Please login!" : "Please register!"}</Title>
        {isRegistered ? <RegisterScreen /> : <LoginScreen />}
        <Divider />
        <a onClick={() => setIsRegistered(!isRegistered)}>
          {" "}
          {isRegistered
            ? "Already have an account? Login!"
            : "No account? Register a new one!"}
        </a>
      </ShadowCard>
    </Container>
  );
};

export const LongButton = styled(Button)`
  width: 100%;
`;

const Title = styled.h2`
  margin-bottom: 2.4 rem;
  color: rgb(94, 108, 132);
`;

const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${left}), url(${right});
`;
const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`;

// styled component could be used as a typical react component
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;
