import { useAuth } from "context/auth-context";
import { TasksListScreen } from "screens/task-list";
import styled from "@emotion/styled";
import { Row } from "components/lib";
import { ReactComponent as SoftwareLogo } from "assets/default.svg";
import { Button, Dropdown, Menu } from "antd";
import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { TaskScreen } from "screens/task";
import { useState } from "react";
import { TaskModal } from "screens/task-list/task-modal";
import { TaskPopover } from "components/task-popover";
import { resetRoute } from "utils";
// This component is the entrace for the screens after login
/**
 * grid vs flex
 * typically, flex for one-dimension; grid for two dimension
 * flex for content-based rendering; grid for design-based rendering
 */
export const AuthenticatedApp = () => {
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  return (
    <Container>
      <PageHeader setTaskModalOpen={setTaskModalOpen} />
      <Main>
        <Router>
          <Routes>
            <Route
              path={"tasks"}
              element={<TasksListScreen setTaskModalOpen={setTaskModalOpen} />}
            />
            <Route path={"tasks/:taskId/*"} element={<TaskScreen />} />
          </Routes>
        </Router>
      </Main>
      <TaskModal
        taskModelOpen={taskModalOpen}
        onClose={() => setTaskModalOpen(false)}
      />
    </Container>
  );
};

const PageHeader = (props: { setTaskModalOpen: (isOpen: boolean) => void }) => {
  // if using a svg file, we could use
  // import {ReactComponent as SoftwareLogo } from "assets/software-logo.png" to use it as <SoftwareLogo/>
  // in which we could pass down parameters and configure it in details
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <SoftwareLogo
          style={{ padding: 0 }}
          width="18rem"
          color={"rgb(38,132,255)"}
        />
        <TaskPopover setTaskModalOpen={props.setTaskModalOpen} />
        <span>Users</span>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  );
};
const User = () => {
  const { logout, user } = useAuth();
  return (
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
