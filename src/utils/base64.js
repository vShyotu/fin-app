export const utf8_to_b64 = (str) => {
  return window.btoa(encodeURIComponent(str));
};

export const b64_to_utf8 = (str) => {
  return decodeURIComponent(window.atob(str));
};
