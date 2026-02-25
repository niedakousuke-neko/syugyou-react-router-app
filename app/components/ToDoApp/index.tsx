import React, { useState } from 'react'; // useState をインポート

// ToDoアイテムの型を定義しておくと便利 (TypeScript)
type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export default function ToDoApp() {
  // 1. ToDoリスト全体を管理するState (初期値は空配列にする)
  const [todos, setTodos] = useState<Todo[]>([]);

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

  // ToDoの完了/未完了を切り替える関数
  const handleToggleComplete = (id: number) => {
    setTodos(
      // todos配列をmapで処理して新しい配列を作る
      todos.map(todo =>
        // もし現在のtodoのidが、クリックされたidと同じなら
        todo.id === id
          // completedプロパティを反転させた新しいオブジェクトを返す
          ? { ...todo, completed: !todo.completed }
          // idが違う場合は、元のtodoオブジェクトをそのまま返す
          : todo
      )
    );
  };

  // ToDoを削除する関数
  const handleDeleteTodo = (id: number) => {
    setTodos(
      // todos配列をfilterで処理して新しい配列を作る
      // クリックされたidと「異なる」idを持つToDoだけを残す
      todos.filter(todo => todo.id !== id)
    );
  };

  // ToDoリストの表示部分を修正
  const todoListItems = todos.map(todo => (
    <li
      key={todo.id}
      className={`mb-2.5 p-2.5 rounded flex justify-between items-center ${todo.completed ? 'bg-gray-300 line-through text-gray-500' : 'bg-gray-200'}`}
    >
      {/* ToDoテキスト部分をクリックでトグルするように変更 */}
      <span onClick={() => handleToggleComplete(todo.id)} className="cursor-pointer flex-1">
        {todo.text}
      </span>
      {/* 削除ボタンを追加 */}
      <button onClick={() => handleDeleteTodo(todo.id)} className="px-2.5 py-1.25 bg-red-500 text-white border-none rounded cursor-pointer text-sm hover:bg-red-600">削除</button>
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