import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "screens/project-list";
import styled from "@emotion/styled";
import { Row } from "components/lib";

// This component is the entrace for the screens after login
/**
 * grid vs flex
 * typically, flex for one-dimension; grid for two dimension
 * flex for content-based rendering; grid for design-based rendering
 */
export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <div>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <h2>Logo</h2>
          <h2>Tasks</h2>
          <h2>Users</h2>
        </HeaderLeft>
        <HeaderRight>
          <button onClick={logout}>Logout</button>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListScreen />
      </Main>
    </div>
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
const Header = styled(Row)``;

const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;

const Main = styled.main``;
