import { useEffect, useState } from "react";

export default function useTitle(initial?: string) {
  const [title, setTitle] = useState<string>(
    initial ? initial : document.title
  );

  useEffect(() => {
    document.title = title;
  }, [title]);

  return { title, setTitle };
}
