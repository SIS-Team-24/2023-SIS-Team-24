import React, { useState, ChangeEvent, useEffect } from "react";

interface ScrapingInputProps {
  onScrape: (url: string) => void;
  setUrlValue: (urlValue: string) => void;
  isScrapeLoading: boolean;
  scrapeError: boolean;
}

const ScrapingInput: React.FC<ScrapingInputProps> = ({
  onScrape,
  setUrlValue,
  isScrapeLoading,
  scrapeError,
}) => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (scrapeError) {
      setUrl("");
      setUrlValue("");
    }
  }, [scrapeError]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    setUrlValue(e.target.value);
  };

  const handleScrapeClick = () => {
    // Call the onScrape function with the entered URL
    onScrape(url);
  };

  return (
    <div>
      <div className="inline-block relative mr-4">
        <input
          type="text"
          placeholder={
            scrapeError
              ? "Please enter a real URL"
              : "Enter URL to summarise a website"
          }
          value={url}
          onChange={handleInputChange}
          className="border border-2 border-customBlue focus:border-blue-400 rounded p-2 w-[280px]"
        />
      </div>
      <button
        style={{
          backgroundColor: "#2e7faa",
        }}
        className="py-2 px-4 text-white rounded"
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
