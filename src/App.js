import './App.css';
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import User from './components/User.jsx';
import AddUser from './components/AddUser.jsx';
import EditUser from './components/EditUser.jsx';
// import EditUser from './components/updateuser/Edit';

function App() {

  const route = createBrowserRouter([
    {
      path:"/",
      element: <User/>,
    },
    {
      path:"/add",
      element: <AddUser/>,
    },
    {
      path:"/edit/:id",
      element: <EditUser/>,
    },
  ])

  return (
    <div className="App">
       <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;
