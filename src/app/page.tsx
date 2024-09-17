"use client"; // 必須

import { useState } from "react";
import { useRouter } from "next/navigation";
import style from "./page.module.css";

const Home: React.FC = () => {
  const [breed, setBreed] = useState<string>("");
  const router = useRouter();

  const handleSearch = () => {
    if (breed) {
      router.push(`/search/${breed}`); // 犬種をパラメーターとして渡して結果ページへ遷移
    }
  };

  return (
    <div className={style.wrapper}>
      <h1>犬の画像を検索するアプリ</h1>
      <input
        type="text"
        value={breed}
        onChange={(e) => setBreed(e.target.value)}
        placeholder="犬種を入力"
        className={style.input}
      />
      <button onClick={handleSearch} className={style.searchButton}>
        検索
      </button>
    </div>
  );
};

export default Home;
