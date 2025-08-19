import { Route, Routes, useLocation } from "react-router-dom";
import AuthPage from "../pages/authPage";
import { DashboardPage } from "../pages/Dashboard";
import { MainLayout } from "../components/layout";
import { AddNewApplication } from "../pages/addApplication";
import { ViewApplication } from "../pages/viewApplication";
import { ViewNotes } from "../pages/viewNotes";
import { CreateNote } from "../pages/createNote";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { EditApplication } from "../pages/editApplication";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />}></Route>

      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />}></Route>
        <Route path="/new-application" element={<AddNewApplication />}></Route>
        <Route
          path="/edit-application/:id"
          element={<EditApplication />}
        ></Route>
        <Route
          path="/view-application/:id"
          element={<ViewApplication />}
        ></Route>
        <Route path="/view-notes/:id" element={<ViewNotes />}></Route>
        <Route path="/create-note/:id" element={<CreateNote />}></Route>
      </Route>
    </Routes>
  );
};
