import React, { useState, useEffect } from "react";
import ToDoApp, { type Todo } from "~/components/ToDoApp";
import { Outlet } from "react-router";

// localStorage のキー（どのデータを保存するかを識別）
const TODO_STORAGE_KEY = "syugyou_todos";

export default function SyugyouRoute() {
  // ① useState の初期値関数：コンポーネント初期化時に localStorage から読み込む
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const savedTodos = localStorage.getItem(TODO_STORAGE_KEY);
      // localStorage に保存されたデータがあれば JSON.parse して返す
      // なければ空配列を返す
      return savedTodos ? JSON.parse(savedTodos) : [];
    } catch (error) {
      console.error("localStorage からの読み込みエラー:", error);
      return [];
    }
  });

  // ② useEffect：todos が変わるたびに、その変更内容を localStorage に保存する
  useEffect(() => {
    try {
      localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error("localStorage への保存エラー:", error);
    }
  }, [todos]);

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