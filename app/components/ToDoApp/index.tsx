import React, { useState } from 'react'; // useState をインポート
import { Link } from 'react-router';

// ToDoアイテムの型を定義しておくと便利 (TypeScript)
export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type Props = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
};

export default function ToDoApp({ todos, setTodos, toggleTodo, deleteTodo }: Props) {

  // 2. 入力フォームのテキストを管理するState (初期値は空文字列)
  const [inputText, setInputText] = useState<string>('');

  // inputの値が変わったらinputText Stateを更新する関数
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value); // 入力された値でStateを更新
  };

  // フォームが送信されたときの処理
  const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputText.trim() === '') return; // 入力が空なら何もしない

    // 新しいToDoオブジェクトを作成
    const newTodo: Todo = {
      id: Date.now(), // ユニークIDとして現在時刻を使う（簡易的）
      text: inputText,
      completed: false, // 最初は未完了
    };

    // ★ Stateを更新: 既存のtodos配列の末尾に新しいToDoを追加した「新しい配列」を作る
    setTodos([...todos, newTodo]);
    setInputText(''); // 追加後、入力フォームを空にする
  };

  // このコンポーネントでは「ToDoリストの状態」を親コンポーネントから受け取る
  // 完了切り替え / 削除のロジックは親側で管理しているので、ここでは関数を呼び出すだけ

  // フィルタリングの状態を管理するState
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

  // フィルタリングされたToDoリストを作る
  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed
      case 'completed':
        return todo.completed
      default:
        return true
    }
  })

  // ToDoリストの表示部分を修正
  const todoListItems = filteredTodos.map(todo => (
    <li
      key={todo.id}
      className={`mb-2.5 p-2.5 rounded flex justify-between items-center ${todo.completed ? 'bg-gray-300 line-through text-gray-500' : 'bg-gray-200'}`}
    >
      {/* ToDoテキストをクリックすると完了/未完了を切り替え */}
      <button
        type="button"
        onClick={() => toggleTodo(todo.id)}
        className="cursor-pointer flex-1 text-left"
      >
        {todo.text}
      </button>

      <div className="flex items-center gap-2">
        {/* 詳細ページへのリンク */}
        <Link
          to={`${todo.id}`}
          className="px-2 py-1.25 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
        >
          詳細
        </Link>
        {/* 削除ボタン */}
        <button
          type="button"
          onClick={() => deleteTodo(todo.id)}
          className="px-2.5 py-1.25 bg-red-500 text-white border-none rounded cursor-pointer text-sm hover:bg-red-600"
        >
          削除
        </button>
      </div>
    </li>
  ));

  // 完了と未完了の数を計算
  const completedCount = todos.filter(todo => todo.completed).length
  const activeCount = todos.filter(todo => !todo.completed).length

  return (
    <div className="bg-gray-100 m-5 font-sans">
      <div className="max-w-2xl mx-auto bg-white p-5 rounded-lg shadow-md">
        <h1 className="text-center text-gray-800 mb-3">ToDoアプリ</h1>

        {/* 完了と未完了の数を表示 */}
        <div className="text-center text-gray-700 mb-3">
          完了: {completedCount} 未完了: {activeCount}
        </div>

        {/* フィルタリングボタン */}
        <div className="flex justify-center space-x-2 mb-3">
          <button onClick={() => setFilter('all')} className={`px-2.5 py-1.25 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}>すべて</button>
          <button onClick={() => setFilter('active')} className={`px-2.5 py-1.25 rounded ${filter === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}>未完了</button>
          <button onClick={() => setFilter('completed')} className={`px-2.5 py-1.25 rounded ${filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}>完了</button>
        </div>     

        {/* ToDo入力フォーム */}
        <form onSubmit={handleAddTodo} className="flex mb-5"> {/* 送信時に関数を呼ぶ */}
          <input
            type="text"
            placeholder="新しいToDoを入力"
            value={inputText}       // inputの値をStateと紐付け
            onChange={handleInputChange} // 値が変わったら関数を呼ぶ
            className="flex-1 p-2.5 border border-gray-300 rounded mr-2.5"
          />
          <button type="submit" className="px-3.5 py-2.5 bg-green-500 text-white border-none rounded cursor-pointer hover:bg-green-600">追加</button>
        </form>

        {/* ToDoリスト表示エリア */}
        <h2 className="text-center text-gray-800 mb-3">ToDoリスト</h2>
        <ul className="list-none p-0">
          {todoListItems} {/* Stateからリストを表示 */}
        </ul>
        
        {/* 未完了のToDoがない場合のメッセージを表示 */}
        <div className="text-center text-gray-700 mb-3">
          {activeCount === 0 && <p>未完了のToDoはありません</p>}
        </div>
      </div>
    </div>
  );
}