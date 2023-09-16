import React from "react";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import NavigationBar from "./NavigationBar";
import HistoryModal from "../components/HistoryModal";
import { clearHistory, retrieveHistory } from "../components/Utils";

interface HistoryItem {
  id: number;
  summaryTitle: string;
  summary: string;
  date: string;
}

function History() {
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<HistoryItem>();

  useEffect(() => {
    getAnalysisHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleViewClick = (item: HistoryItem) => {
    // Implement logic to view the selected summary here
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleClearHistoryClick = () => {
    // Implement logic to clear history here
    clearHistory();
    setHistoryItems([]); // Clear the displayed history items
  };

  // Example of how to use retrieveHistory()...
  const getAnalysisHistory = () => {
    const historyArr = retrieveHistory();
    // Do some formatting...
    setHistoryItems(
      JSON.parse(JSON.stringify(historyArr)).map((item: any, index: number) => {
        return {
          id: index + 1,
          date: new Date(item.timestamp).toLocaleDateString("en-AU"),
          summaryTitle: `Summary ${index + 1}`,
          summary: item.summary,
        };
      })
    );
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
                  <p className="summary-text">{item.summaryTitle}</p>
                  <p className="summary-date">{item.date}</p>
                </div>
                <div className="view-button">
                  <Button
                    variant="active"
                    onClick={() => handleViewClick(item)}
                  >
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
      {isModalOpen && (
        <HistoryModal
          item={selectedItem}
          onClose={() => {
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
}

export default History;
