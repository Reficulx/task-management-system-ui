import { User } from "./search-panel";

interface Project {
  id: string;
  name: string;
  personId: string;
  pin:boolean;
  organization:string;
}
interface ListProps {
  users: User[],
  list: Project[]
}
export const List = ({ list, users }:ListProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Project Name</th>
          <th>Person in Charge</th>
        </tr>
      </thead>
      <tbody>
        {list.map((project) => (
          <tr key={project.id}>
            <td>{project.name}</td>
            {/*undefined.name*/}
            <td>
              {users.find(user => user.id === project.personId)?.name ||
                "Unknown"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
