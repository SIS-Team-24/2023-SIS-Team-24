import React, { useState, ChangeEvent, useEffect } from "react";

interface ScrapingInputProps {
  onScrape: (url: string) => void;
  setUrlValue: (urlValue: string) => void;
  urlValue: string;
  isScrapeLoading: boolean;
  scrapeError: boolean;
}

const ScrapingInput: React.FC<ScrapingInputProps> = ({
  onScrape,
  setUrlValue,
  urlValue,
  isScrapeLoading,
  scrapeError,
}) => {
  useEffect(() => {
    if (scrapeError) {
      setUrlValue("");
    }
  }, [scrapeError, setUrlValue]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUrlValue(e.target.value);
  };

  const handleScrapeClick = () => {
    // Call the onScrape function with the entered URL
    onScrape(urlValue);
  };

  return (
    <div>
      <div className="inline-block relative mr-4">
        <input
          type="text"
          placeholder={
            scrapeError
              ? "Website does not allow summary"
              : "Enter URL to summarise a website"
          }
          value={urlValue}
          onChange={handleInputChange}
          className="border border-2 border-customBlue focus:border-blue-400 rounded p-2 w-[280px] h-full" // Added h-full class
          />
      </div>
      <button
        style={{
          backgroundColor: "#2e7faa",
        }}
        className="py-2 px-4 mr-6 text-white rounded h-full" // Added h-full class
        onClick={handleScrapeClick}
      >
        {isScrapeLoading ? (
          // Loading icon or text
          <div className="animate-spin h-5 w-5 border-t-2 border-blue-400 rounded-full"></div>
        ) : (
          "Extract"
        )}
      </button>
    </div>
  );
};

export default ScrapingInput;
