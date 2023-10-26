export const setSentimentStyle = (sentimentText: string) => {
  switch (sentimentText) {
    case "Positive":
      return {
        color: "#65a30d",
        paddingLeft: "8px",
      };
    case "Negative":
      return {
        color: "red",
        paddingLeft: "8px",
      };
    default:
      return {
        color: "black",
        paddingLeft: "8px",
      };
  }
};

export const setEmotionStyle = (emotionLabel: string) => {
  switch (emotionLabel) {
    case "Anger":
      return {
        backgroundColor: "red",
        color: "black",
        padding: "8px",
        borderRadius: "4px",
      };
    case "Admiration":
      return {
        backgroundColor: "purple",
        color: "black",
        padding: "8px",
        borderRadius: "4px",
      };
    case "Amusement":
      return {
        backgroundColor: "gold",
        color: "black",
        padding: "8px",
        borderRadius: "4px",
      };
    case "Annoyance":
      return {
        backgroundColor: "darkred",
        color: "black",
        padding: "8px",
        borderRadius: "4px",
      };
    case "Approval":
      return {
        backgroundColor: "green",
        color: "black",
        padding: "8px",
        borderRadius: "4px",
      };
    case "Caring":
      return {
        backgroundColor: "lavender",
        color: "black",
        padding: "8px",
        borderRadius: "4px",
      };
    case "Confusion":
      return {
        backgroundColor: "lightgrey",
        color: "black",
        padding: "8px",
        borderRadius: "4px",
      };
    case "Curiosity":
      return {
        backgroundColor: "lightyellow",
        color: "black",
        padding: "8px",
        borderRadius: "4px",
      };
    case "Desire":
      return {
        backgroundColor: "darkpink",
        color: "black",
        padding: "8px",
        borderRadius: "4px",
      };
    case "Disappointment":
      return {
        backgroundColor: "grey",
        color: "black",
        padding: "8px",
        borderRadius: "4px",
      };
    case "Disapproval":
      return {
        backgroundColor: "darkorange",
        color: "black",
        padding: "8px",
        borderRadius: "4px",
      };
    case "Disgust":
      return {
        backgroundColor: "darkgreen",
        color: "black",
        padding: "8px",
        borderRadius: "4px",
      };
    case "Embarrassment":
      return {
        backgroundColor: "lightpink",
        color: "black",
        padding: "8px",
        borderRadius: "4px",
      };
    case "Excitement":
      return {
        backgroundColor: "brightyellow",
        color: "black",
        padding: "8px",
        borderRadius: "4px",
      };
    case "Fear":
      return {
        backgroundColor: "lightblue",
        color: "black",
        padding: "8px",
        borderRadius: "4px",
      };
    case "Gratitude":
      return {
        backgroundColor: "limegreen",
        color: "black",
        padding: "8px",
        borderRadius: "4px",
      };
    case "Grief":
      return {
        backgroundColor: "darkgrey",
        color: "black",
        padding: "8px",
        borderRadius: "4px",
      };
    case "Joy":
      return {
        backgroundColor: "lightgreen",
        color: "black",
        padding: "8px",
        borderRadius: "4px",
      };
    case "Love":
      return {
        backgroundColor: "pink",
        color: "black",
        padding: "8px",
        borderRadius: "4px",
      };
    case "Nervousness":
      return {
        backgroundColor: "lightblue",
        color: "black",
        padding: "8px",
        borderRadius: "4px",
      };
    case "Optimism":
      return {
        backgroundColor: "brightyellow",
        color: "black",
        padding: "8px",
        borderRadius: "4px",
      };
    case "Pride":
      return {
        backgroundColor: "royalblue",
        color: "black",
        padding: "8px",
        borderRadius: "4px",
      };
    case "Realization":
      return {
        backgroundColor: "darkpurple",
        color: "black",
        padding: "8px",
        borderRadius: "4px",
      };
    case "Relief":
      return {
        backgroundColor: "limegreen",
        color: "black",
        padding: "8px",
        borderRadius: "4px",
      };
    case "Remorse":
      return {
        backgroundColor: "darkgrey",
        color: "black",
        padding: "8px",
        borderRadius: "4px",
      };
    case "Sadness":
      return {
        backgroundColor: "lightblue",
        color: "black",
        padding: "8px",
        borderRadius: "4px",
      };
    case "Surprise":
      return {
        backgroundColor: "lightpink",
        color: "black",
        padding: "8px",
        borderRadius: "4px",
      };
    case "Neutral":
      return {
        backgroundColor: "white",
        color: "black",
        padding: "8px",
        borderRadius: "4px",
      };
    default:
      return {
        backgroundColor: "white",
        color: "black",
        padding: "8px",
        borderRadius: "4px",
      };
  }
};

export const getEmojiForEmotion = (emotion: string) => {
  const emojiMap: { [key: string]: string } = {
    joy: "😄",
    sadness: "😢",
    anger: "😡",
    love: "❤️",
    surprise: "😲",
    admiration: "😍",
    amusement: "😄",
    annoyance: "😒",
    approval: "👍",
    caring: "🥰",
    confusion: "😕",
    curiosity: "🤔",
    desire: "😍",
    disappointment: "😞",
    disapproval: "👎",
    disgust: "🤢",
    embarrassment: "😳",
    excitement: "😃",
    fear: "😨",
    gratitude: "🙏",
    grief: "😢",
    nervousness: "😬",
    optimism: "😊",
    pride: "🦚",
    realization: "💡",
    relief: "😌",
    remorse: "😔",
    neutral: "😐",
  };

  return emojiMap[emotion];
};
