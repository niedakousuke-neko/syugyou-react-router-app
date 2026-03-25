import React, { useState } from "react";
import ToDoApp, { type Todo } from "~/components/ToDoApp";
import { Outlet } from "react-router";

export default function SyugyouRoute() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const toggleTodo = (id: number) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-5 rounded-lg shadow-md">
      <h1>syugyou</h1>
      <ToDoApp todos={todos} setTodos={setTodos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
      {/* 子ページ表示 */}
      <Outlet context={{ todos, toggleTodo, deleteTodo }} />
    </div>
  );
}