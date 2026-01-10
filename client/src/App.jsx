import AppRouter from "./routes/AppRouter";
import "./utils/I18n";
import { useTranslation } from "react-i18next";

function App() {
  const { i18n } = useTranslation();

  return (
    <div className="app-layout flex" dir={i18n.dir(i18n.language)}>
      <div className="flex-1">
        <AppRouter />
      </div>
    </div>
  );
}

export default App;