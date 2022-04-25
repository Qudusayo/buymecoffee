import { useState, useEffect } from "react";

export const useSelected = () => {
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  return { selected, setSelected };
};
