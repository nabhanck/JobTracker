import { BrowserRouter } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/authPage";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes></AppRoutes>
    </BrowserRouter>
  );
}

export default App;
