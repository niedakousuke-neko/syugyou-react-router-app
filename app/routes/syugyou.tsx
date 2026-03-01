import ToDoApp from "~/components/ToDoApp";
import { Outlet } from "react-router";

export default function SyugyouRoute() {
  return (
    <div className="max-w-2xl mx-auto bg-white p-5 rounded-lg shadow-md">
      <h1>syugyou</h1>
      <ToDoApp />
      {/* 子ページ表示 */}
      <Outlet />
    </div>
  );
}