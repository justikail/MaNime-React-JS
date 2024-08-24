import { useEffect, useRef, useState } from "react";
import ColorThief from "colorthief";

function useGetColors({ image }) {
  const [dominanColor, setDominanColor] = useState("#030303");
  const imgRef = useRef(null);

  useEffect(() => {
    if (imgRef.current) {
      const colorThief = new ColorThief();
      imgRef.current.onload = () => {
        const dominantColorArray = colorThief.getColor(imgRef.current);
        setDominanColor(`rgb(${dominantColorArray.join(",")})`);
      };
    }
  }, [image]);

  return { dominanColor, imgRef };
}

export { useGetColors };
