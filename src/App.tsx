import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import TaskList from "./components/Tasks/TaskList";
import Logout from "./components/Auth/Logout";
import Header from "./components/Shared/Header";
import Footer from "./components/Shared/Footer";
import { AuthProvider } from "./contexts/AuthContext";

import './App.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/tasks" element={<TaskList />} />
            <Route path="/logout" element={<Logout />} />
            {/* Adicione uma rota para a página inicial */}
            <Route path="/" element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;

