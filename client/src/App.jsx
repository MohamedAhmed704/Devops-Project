import AppRouter from "./routes/AppRouter";

function App() {

  return (
    <div className="app-layout flex">

      <div className="flex-1 p-4">
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        <AppRouter />
      </div>
    </div>

  )
}

export default App
