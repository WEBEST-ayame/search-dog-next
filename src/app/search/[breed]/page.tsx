"use client"; // 必須

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DogImage from "@/component/DogImage";
import style from "./page.module.css";
import { fetchDogImage } from "@/lib/fetchDogImage";

const BreedPage: React.FC = () => {
  const params = useParams();
  const breed = params.breed; // URLから犬種を取得
  const [dogImageUrl, setDogImageUrl] = useState<string[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getDogImages = async () => {
      setLoading(true);
      setError(null);
      try {
        const images = await fetchDogImage(breed);
        setDogImageUrl(images);
      } catch (err) {
        const errorMessage =
          typeof err === "string"
            ? err
            : (err as { message?: string }).message || "エラーが発生しました。";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (breed) {
      getDogImages(); // 関数を呼び出す
    }
  }, [breed]); // 依存配列はbreedのみ

  return (
    <div className={style.wrapper}>
      <h1>{breed}の画像</h1>
      {loading && <p>読み込み中...</p>}
      {error && <p className={style.error}>{error}</p>}
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
