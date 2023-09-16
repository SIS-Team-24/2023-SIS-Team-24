// Essential props for POST request
export const postRequestOptions = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
};

export interface AnalysisInput {
  summary: string;
  // Sentiment can potential be undefined, depending on the type of text that is inputted
  // Referencing previous discussion on how some texts may not have sentiment (e.g. stories)
  sentiment?: {
    sentiment: string;
    score: number;
    emotions: string[];
  };
}

export interface AnalysisOutput extends AnalysisInput {
  timestamp: number;
}

// Note 01: Referencing previous testing on the summary analysis, the summary of an input
// will always be the same, and due to the current agreement on "it's okay if the summary is the same".
// Thus, an ID won't be necessary there'll only be one summary per input
// (i.e there won't be various summaries to relate to a single input, one-to-one relo)
export function addToHistory(analysis: AnalysisInput) {
  const historyArr: AnalysisOutput[] = JSON.parse(
    sessionStorage.getItem("history") || "[]"
  );
  // If summary does not exist in history, store into history...
  // prevent double storage of the same history, refer to Note 01
  if (!historyArr.find((h) => h.summary === analysis.summary)) {
    historyArr.push({ timestamp: Date.now(), ...analysis });
  }
  sessionStorage.setItem("history", JSON.stringify(historyArr));
}

// Retrieve data from sessionStorage (string), then convert into appropriate data type (JSON.parse)
export function retrieveHistory(): AnalysisOutput[] {
  return JSON.parse(sessionStorage.getItem("history") || "[]");
}

// Set history to empty arr
export function clearHistory() {
  sessionStorage.setItem("history", "[]");
}
