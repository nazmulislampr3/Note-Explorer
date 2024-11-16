import { useEffect, useState } from "react";

type ReturnType = {
  remaining: number;
};

const extract = (data: string | Date | number): number => {
  return (data as Date)
    ? (data as Date).getTime()
    : (data as string)
    ? new Date(data).getTime()
    : Number(data);
};

const useCountDown = (
  endAt: string | Date | number,
  startAt: string | Date | number,
  timeout: number = 1
): ReturnType => {
  endAt = extract(endAt);
  startAt = extract(startAt);
  const [remaining, setRemaining] = useState<number>(endAt - startAt);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining((prev) => Math.max(0, prev - 1));
    }, timeout * 1000);

    if (remaining <= 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [endAt, startAt, remaining]);

  return { remaining };
};

export default useCountDown;
