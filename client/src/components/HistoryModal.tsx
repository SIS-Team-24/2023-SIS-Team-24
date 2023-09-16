import React from "react";
import Button from "./Button";

interface HistoryItem {
  id: number;
  summaryTitle: string;
  summary: string;
  date: string;
}

interface HistoryModalProps {
  item: HistoryItem | undefined;
  onClose: () => void;
}

const HistoryModal: React.FC<HistoryModalProps> = ({
  item,
  onClose,
  ...props
}: HistoryModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center content-center z-50 max-w-[80%] mx-auto">
      <div className="modal-bg fixed inset-0 bg-black opacity-50"></div>
      <div className="modal-container bg-white p-8 rounded-lg shadow-lg z-50">
        <h2 className="text-xl font-semibold mb-4">
          {item?.summaryTitle} - {item?.date}
        </h2>
        <p>{item?.summary}</p>
        <div className="flex justify-end mt-4">
          <Button onClick={onClose} variant="active">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HistoryModal;
