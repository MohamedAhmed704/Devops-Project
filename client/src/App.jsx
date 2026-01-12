import AppRouter from "./routes/AppRouter";
import "./utils/I18n";
import { useTranslation } from "react-i18next";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/queryClient";

function App() {
  const { i18n } = useTranslation();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="app-layout flex" dir={i18n.dir(i18n.language)}>
        <div className="flex-1">
          <AppRouter />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;