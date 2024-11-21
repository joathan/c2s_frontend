import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import TaskList from "./components/Tasks/TaskList";
import TaskForm from "./components/Tasks/TaskForm";
import TaskEdit from "./components/Tasks/TaskEdit";
import Register from "./components/Auth/Register";
import Logout from "./components/Auth/Logout";
import Header from "./components/Shared/Header";
import Footer from "./components/Shared/Footer";
import Notifications from "./components/Notifications";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div id="app-layout">
          <Header />
          <main>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/tasks" element={<TaskList />} />
              <Route path="/tasks/new" element={<TaskForm />} />
              <Route path="/tasks/edit/:id" element={<TaskEdit />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/" element={<Login />} />
            </Routes>
            <Notifications />
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
