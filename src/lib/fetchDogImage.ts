import { Breed } from "./types";

export const fetchDogImage = async (breed: Breed) => {
  try {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
    if (response.ok) {
      const data = await response.json();
      return data.message;
    } else {
      throw new Error("画像を取得できませんでした。犬種を確認してください。");
    }
  } catch (err) {
    throw new Error("エラーが発生しました。");
  }
};
