import TaskList from "./components/task-list/task-list.component";
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import {
  BrowserRouter as Router, Switch, Route, Link, BrowserRouter
} from "react-router-dom";
import { useHistory } from 'react-router'
function App() {
  let history = useHistory();
  const items = [
    {
      label: 'Tasks',
      icon: 'pi pi-fw pi-file',
      items: [
        {
          label: 'Task List',
          icon: 'pi pi-fw pi-plus',
          command: () => {
            handleClick('/tasks');
          },
          items: [
            {
              label: 'Add Task',
              icon: 'pi pi-fw pi-bookmark'
            }
          ]
        },
        {
          label: 'Task Detail',
          icon: 'pi pi-fw pi-trash',
          command: () => {
            alert("tete");
          }
        }
      ]
    },
    {
      label: 'Contact',
      icon: 'pi pi-fw pi-pencil',
      items: [
        {
          label: 'Left',
          icon: 'pi pi-fw pi-align-left'
        }
      ]
    },
    {
      label: 'Logout',
      icon: 'pi pi-fw pi-power-off'
    }
  ];

  const handleClick = (path: string) => {
    history.push(path);
  }

  const start = <Link to="/">
    <img alt="logo" src="https://www.primefaces.org/primereact/showcase/showcase/images/primereact-logo-dark.png" onError={(e: any) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} height="40" className="p-mr-2"></img>
  </Link>;
  const end = <InputText placeholder="Search" type="text" />;

  return (
    <div>
      <Menubar model={items} start={start} end={end} />
      <Switch>
        <Route path="/tasks">
          <TaskList />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

function Home() {
  return <h2>Home</h2>;
}

export default App;
