import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from "lz-string";

export const serializeState = (state: any) => {
  console.log(state)
  const jsonString = JSON.stringify(state);
  return compressToEncodedURIComponent(jsonString);
};

export const deserializeState = (encodedState: string) => {
  if (!encodedState) return null;
  const jsonString = decompressFromEncodedURIComponent(encodedState);
  return jsonString ? JSON.parse(jsonString) : null;
};

export const getStateFromUrl = (): any | null => {
  const urlParams = new URLSearchParams(window.location.search);
  const encodedState = urlParams.get('state');
  return encodedState ? deserializeState(encodedState) : null;
};

export const generateSharableUrl = (state: any) => {
  const baseUrl = window.location.origin + window.location.pathname;
  const serializedState = serializeState(state);
  return `${baseUrl}?state=${serializedState}`;
};