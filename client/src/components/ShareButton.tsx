import React from "react";

interface ShareButtonProps {
  onClickFunction: (e: React.MouseEvent<HTMLButtonElement>) => void;
  id: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ onClickFunction, id }) => {
  return (
    <button
      id={id}
      style={{ backgroundColor: "#2e7faa" }}
      className="py-2 px-4 text-white rounded flex items-center justify-center"
      onClick={onClickFunction}
    >
      Share URL
      <img
        src="/share-icon.png"
        alt="Share"
        className="ml-3 w-4 h-4 transform scale-150"
      />
    </button>
  );
};

export default ShareButton;
