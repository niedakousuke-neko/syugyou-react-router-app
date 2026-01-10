import React, { useState } from 'react'; // useState をインポート
import './App.css'; // CSSファイルを読み込み

// ToDoアイテムの型を定義しておくと便利 (TypeScript)
type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export default function TodoApp() {
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
      // classNameをcompleted状態に応じて変える
      className={todo.completed ? 'completed' : ''}
    >
      {/* ToDoテキスト部分をクリックでトグルするように変更 */}
      <span onClick={() => handleToggleComplete(todo.id)} style={{ cursor: 'pointer', flexGrow: 1 }}>
        {todo.text}
      </span>
      {/* 削除ボタンを追加 */}
      <button onClick={() => handleDeleteTodo(todo.id)}>削除</button>
    </li>
  ));

  return (
    <div className="App">
      <h1>ToDoアプリ</h1>

      {/* ToDo入力フォーム */}
      <form onSubmit={handleAddTodo}> {/* 送信時に関数を呼ぶ */}
        <input
          type="text"
          placeholder="新しいToDoを入力"
          value={inputText}       // inputの値をStateと紐付け
          onChange={handleInputChange} // 値が変わったら関数を呼ぶ
        />
        <button type="submit">追加</button>
      </form>

      {/* ToDoリスト表示エリア */}
      <h2>ToDoリスト</h2>
      <ul>
        {todoListItems} {/* Stateからリストを表示 */}
      </ul>
    </div>
  );
}