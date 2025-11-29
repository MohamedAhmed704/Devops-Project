import Dashboard from "./pages/admin/Dashboard/Dashboard";
import Employees from "./pages/admin/Employees";
import TimeTracking from "./pages/admin/TimeTracking";
import Home from "./pages/Home";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <>
      <Employees />
      {/* <TimeTracking/> */}
      {/* <Home/> */}
    </>
    // <div className="app-layout flex">

    //   <div className="flex-1">
    //     {/* <AppRouter /> */}
    //     <Dashboard />
    //   </div>

    // </div>
  );
}

export default App;
