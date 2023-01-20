import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "screens/project-list";
import styled from "@emotion/styled";
import { Row } from "components/lib";
import { ReactComponent as SoftwareLogo } from "assets/default.svg";
import { Dropdown, Menu } from "antd";

// This component is the entrace for the screens after login
/**
 * grid vs flex
 * typically, flex for one-dimension; grid for two dimension
 * flex for content-based rendering; grid for design-based rendering
 */
export const AuthenticatedApp = () => {
  const { logout, user } = useAuth();
  // if using a svg file, we could use
  // import {ReactComponent as SoftwareLogo } from "assets/software-logo.png" to use it as <SoftwareLogo/>
  // in which we could pass down parameters and configure it in details
  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <SoftwareLogo width="18rem" color={"rgb(38,132,255)"} />
          <h2>Tasks</h2>
          <h2>Users</h2>
        </HeaderLeft>
        <HeaderRight>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key={"logout"}>
                  <a onClick={logout}>Logout</a>
                </Menu.Item>
              </Menu>
            }
          >
            <a onClick={(e) => e.preventDefault()}>Hi, {user?.username}!</a>
          </Dropdown>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  );
};

const HeaderItem = styled.h3`
  margin-right: 3rem;
`;

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

// grid-area
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
`;

const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;

const Main = styled.main``;
