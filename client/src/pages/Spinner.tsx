import React, { useState, useEffect } from "react";

interface SpinnerProps {
  isError: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ isError }) => {
  const [dots, setDots] = useState<number>(0);

  useEffect(() => {
    let dotsInterval: NodeJS.Timeout;

    dotsInterval = setInterval(() => {
      setDots((prevDots) => (prevDots === 3 ? 0 : prevDots + 1));
    }, 1000);

    return () => {
      clearInterval(dotsInterval);
    };
  }, []);

  useEffect(() => {
    let dotsInterval: NodeJS.Timeout | undefined;

    if (dotsInterval) {
      clearInterval(dotsInterval);

      dotsInterval = setInterval(() => {
        setDots((prevDots) => (prevDots === 3 ? 0 : prevDots + 1));
      }, 1000);
    }
  }, [dots]);

  if (isError) {
    return (
        <div className="text-red-500 text-2xl flex justify-center items-center h-full">
        <span className="inline-flex flex-col rounded-full h-8 w-8 border-2 border-red-500 items-center">
          <span className="text-xl">!</span>
          <span className="text-sm">Error</span>
        </span>
      </div>      
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"></div>
      <div className="mb-2 text-center w-40">
        Summarising{Array(dots + 1).join(".")}
      </div>
    </div>
  );
};

export default Spinner;
