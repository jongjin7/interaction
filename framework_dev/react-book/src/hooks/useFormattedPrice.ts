import { useState, useEffect } from "react";

const useFormattedPrice = (value: number) => {
  const [formattedPrice, setFormattedPrice] = useState<string>("");

  useEffect(() => {
    setFormattedPrice(value.toLocaleString());
  }, [value]);

  return formattedPrice;
};

export default useFormattedPrice;
