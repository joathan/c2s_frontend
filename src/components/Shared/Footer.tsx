import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-light text-center py-3 mt-auto">
      <div className="container">
        <p className="mb-1">Task Manager &copy; {currentYear}</p>
        <p className="mb-0">
          <a href="/tasks" className="text-light text-decoration-none me-3">
            Tasks
          </a>
          <a href="/tasks/new" className="text-light text-decoration-none me-3">
            Nova Task
          </a>
          <a href="/login" className="text-light text-decoration-none">
            Login
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
