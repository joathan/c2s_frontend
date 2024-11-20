import React, { useState } from "react";

const TaskForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("pending");
  const [url, setUrl] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("Você precisa estar logado para criar uma tarefa.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3200/api/v1/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, status, url }),
      });

      if (response.ok) {
        alert("Task criada com sucesso!");
        window.location.href = "/tasks";
      } else {
        const errorData = await response.json();
        alert(`Erro ao criar task: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Erro ao criar task:", error);
      alert("Erro ao criar task. Tente novamente.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Criar Task</h1>
      <div>
        <label>Título:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="pending">Pendente</option>
          <option value="in_progress">Em Progresso</option>
          <option value="completed">Concluída</option>
          <option value="failed">Falhou</option>
        </select>
      </div>
      <div>
        <label>URL:</label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </div>
      <button type="submit">Criar</button>
    </form>
  );
};

export default TaskForm;
