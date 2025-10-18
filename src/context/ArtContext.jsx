import React, { createContext, useContext, useEffect, useState } from "react";
import { artSamples } from "../data/artSamples";

const ArtContext = createContext();

export function ArtProvider({ children }) {
  const [arts, setArts] = useState([]);

  // 🔹 Lấy dữ liệu từ localStorage hoặc artSamples khi mở trang
  useEffect(() => {
    const saved = localStorage.getItem("artworks");
    if (saved) {
      try {
        setArts(JSON.parse(saved));
      } catch {
        setArts(artSamples);
      }
    } else {
      setArts(artSamples);
    }
  }, []);

  // 🔹 Mỗi khi có thay đổi → lưu lại vào localStorage
  useEffect(() => {
    if (arts && arts.length > 0)
      localStorage.setItem("artworks", JSON.stringify(arts));
  }, [arts]);

  return (
    <ArtContext.Provider value={{ arts, setArts }}>
      {children}
    </ArtContext.Provider>
  );
}

export const useArts = () => useContext(ArtContext);
