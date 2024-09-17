"use client"; // 必須

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DogImage from "@/component/DogImage";
import style from "./page.module.css";

const BreedPage: React.FC = () => {
  const params = useParams();
  const breed = params.breed; // URLから犬種を取得
  const [dogImageUrl, setDogImageUrl] = useState<string[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // useEffect内でfetchDogImageを定義
    const fetchDogImage = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://dog.ceo/api/breed/${breed}/images`
        );
        if (response.ok) {
          const data = await response.json();
          setDogImageUrl(data.message);
        } else {
          setError("画像を取得できませんでした。犬種を確認してください。");
        }
      } catch (err) {
        setError("エラーが発生しました。");
      } finally {
        setLoading(false);
      }
    };

    if (breed) {
      fetchDogImage(); // 関数を呼び出す
    }
  }, [breed]); // 依存配列はbreedのみ

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>{breed}の画像</h1>
      {loading && <p>読み込み中...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className={style.imageWrap}>
        {dogImageUrl &&
          dogImageUrl.map((src, index) => <DogImage key={index} url={src} />)}
      </div>
      <button onClick={() => history.back()} className={style.backButton}>
        検索ページに戻る
      </button>
    </div>
  );
};

export default BreedPage;
