import { Link, useOutletContext, useParams } from "react-router";
import type { Todo } from "~/components/ToDoApp";

type OutletContext = {
  todos: Todo[];
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
};

export default function SyugyouDetailRoute() {
  const { id } = useParams();
  const { todos, toggleTodo, deleteTodo } = useOutletContext<OutletContext>();

  const todoId = Number(id);
  const todo = todos.find(t => t.id === todoId);

  if (!id) {
    return (
      <div className="mt-6 p-4 bg-yellow-100 rounded">
        <p>IDが指定されていません。</p>
        <Link to=".." className="text-blue-600 hover:underline">
          一覧に戻る
        </Link>
      </div>
    );
  }

  if (!todo) {
    return (
      <div className="mt-6 p-4 bg-red-100 rounded">
        <p>指定されたIDのToDoは見つかりませんでした: {id}</p>
        <Link to=".." className="text-blue-600 hover:underline">
          一覧に戻る
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow-sm border">
      <h2 className="text-xl font-semibold mb-2">ToDo詳細</h2>
      <p className="mb-1">
        <strong>ID:</strong> {todo.id}
      </p>
      <p className="mb-3">
        <strong>内容:</strong> {todo.text}
      </p>
      <p className="mb-3">
        <strong>状態:</strong> {todo.completed ? "完了" : "未完了"}
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => toggleTodo(todo.id)}
          className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {todo.completed ? "未完了に戻す" : "完了にする"}
        </button>
        <button
          type="button"
          onClick={() => deleteTodo(todo.id)}
          className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          このToDoを削除
        </button>
        <Link
          to=".."
          className="px-3 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
        >
          一覧に戻る
        </Link>
      </div>
    </div>
  );
}