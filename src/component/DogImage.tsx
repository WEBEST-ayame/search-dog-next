import React from "react";
import Image from "next/image";
import style from "./DogImage.module.css";

interface DogImageProps {
  url: string;
}

const DogImage: React.FC<DogImageProps> = ({ url }) => {
  return (
    <div className={style.imgWrap}>
      <Image src={url} alt="犬の画像" width={500} height={300} />
    </div>
  );
};

export default DogImage;
