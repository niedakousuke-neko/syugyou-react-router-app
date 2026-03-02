import ToDoApp from "~/components/ToDoApp";
import { Outlet, Link } from "react-router";

export default function SyugyouRoute() {
  const todos = [
    { id: "1", title: "React勉強" },
    { id: "2", title: "Router理解" },
    { id: "3", title: "ToDo作成" },
  ];

  return (
    <div className="max-w-2xl mx-auto bg-white p-5 rounded-lg shadow-md">
      <h1>syugyou</h1>

      <h2>一覧</h2>

      {todos.map(todo => (
        <div key={todo.id}>
          {/* ⭐ ここ重要 */}
          <Link to={todo.id}>
            {todo.title}
          </Link>
        </div>
      ))}

      <Outlet />
    </div>
  );
}