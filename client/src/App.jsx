import Home from "./pages/Home/Home";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <div className="app-layout flex">
      <div className="flex-1">
        <AppRouter />
      </div>
    </div>
  );
}

export default App;
