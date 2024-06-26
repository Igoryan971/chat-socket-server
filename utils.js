const trimStr = (str) =>
  str && typeof str === "string" ? str.trim().toLowerCase() : "";

exports.trimStr = trimStr;
