import { Button, Card, Divider, Typography } from "antd";
import { useState } from "react";
import { LoginScreen } from "./login";
import { RegisterScreen } from "./register";
import styled from "@emotion/styled";
import logo from "assets/logo.svg";
import left from "assets/left.svg";
import right from "assets/right.svg";
import { useDocumentTitle } from "utils";

// This component is the entrance for the login/register screens
export const UnauthenticatedApp = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useDocumentTitle("TMS-entrance", false);

  return (
    <Container>
      <Header />
      <Background />
      <ShadowCard>
        <Title>{!isRegistered ? "User login" : "User Registration"}</Title>
        {error ? (
          <Typography.Text type={"danger"}>{error.message}</Typography.Text>
        ) : null}
        {isRegistered ? (
          <RegisterScreen onError={setError} />
        ) : (
          <LoginScreen onError={setError} />
        )}
        <Divider />
        <Button type="link" onClick={() => setIsRegistered(!isRegistered)}>
          {isRegistered
            ? "Already have an account? Login!"
            : "No account? Register a new one!"}
        </Button>
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
  padding: 16rem 0;
  background-size: 70rem;
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

/**
 * A typical pitfall when using react hook:
 *
 * const Test = () => {
 *   let num = 1;
 *   const effect = () => {
 *     num += 1;
 *     const message =  `num value in message: ${num}`
 *
 *     return function unmount() {
 *       console.log(message);
 *     }
 *   }
 *   return effect;
 * }
 * // execute test
 * const add = test()
 * // execute effect, generate first message value
 * const unmount = add()
 * add() // generate another message value
 * add() // same as above
 * add()
 * add()
 * unmount() // print out the first message value, which is 1, instead of 5, since message is not updated, but re-generated everytime
 */
