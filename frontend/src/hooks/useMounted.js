import { useEffect, useState } from "react";

export default function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setTimeout(() => setMounted(true), 30);
    return () => {
      setMounted(false);
    };
  }, []);

  return mounted;
}
