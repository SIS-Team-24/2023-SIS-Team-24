import React from "react";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import NavigationBar from "./NavigationBar";
import { clearHistory } from "../components/Utils";


interface HistoryItem {
    id: number;
    summary: string;
    date: string;
  }
  
  function History() {
    const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  
    const mockHistoryData: HistoryItem[] = [
      {
        id: 1,
        summary: "Summary 1",
        date: "2023-09-10",
      },
      {
        id: 2,
        summary: "Summary 2",
        date: "2023-09-10",
      },
      {
        id: 3,
        summary: "Summary 3",
        date: "2023-09-10",
      },
    ];
  
    useEffect(() => {
      setHistoryItems(mockHistoryData);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []); 
  
    const handleViewClick = (item: HistoryItem) => {
        // Implement logic to view the selected summary here
        console.log(`Viewing summary: ${item.summary}`);
      };
    
      const handleClearHistoryClick = () => {
        // Implement logic to clear history here
        clearHistory();
        setHistoryItems([]); // Clear the displayed history items
      };
    
      return (
        <div className="mt-10">
          <NavigationBar />
          <h1 className="mt-20 font-extrabold">
        <p className="flex items-center justify-start space-x-4 text-3xl ml-60 mt-10">
          Summary History
        </p>
        <div className="clearHistory-button">
          <Button variant="active" onClick={handleClearHistoryClick}>
            Clear History
          </Button>
        </div>
      </h1>
    
          <br />
          <br />
          <div className="rectangle-box">
            {historyItems.length > 0 ? (
              historyItems.map((item) => (
                <div key={item.id} className="history-item">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="summary-text">{item.summary}</p>
                      <p className="summary-date">{item.date}</p>
                    </div>
                    <div className="view-button">
                      <Button variant="active" onClick={() => handleViewClick(item)}>
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No history available.</p>
            )}
          </div>
        </div>
      );
    }
    
    export default History;
