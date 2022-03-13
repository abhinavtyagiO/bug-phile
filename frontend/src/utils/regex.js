import { URL_REGEX } from "../constants/regex";

export const isValidUrl = (url) => {
  return URL_REGEX.test(url);
};
