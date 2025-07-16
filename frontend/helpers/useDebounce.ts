import React, { useEffect, useState } from "react";

export function useDebounce(input: string) {
  const [debouncedValue, setDebouncedValue] = useState<string>(input);
  let timeout;

  useEffect(() => {
    let timeout = setTimeout(() => {
      setDebouncedValue(input);
    }, 500);
    return () => clearTimeout(timeout);
  }, [input]);
  return debouncedValue;
}
