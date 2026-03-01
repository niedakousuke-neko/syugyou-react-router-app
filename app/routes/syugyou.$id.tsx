import { useParams } from "react-router";

export default function SyugyouDetailRoute() {
  const { id } = useParams();

  return (
    <div>
      <h1>詳細ページ</h1>
      <p>ID: {id}</p>
    </div>
  );
}