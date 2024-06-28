const trimStr = (str) =>
  str && typeof str === "string" ? str.trim().toLowerCase() : "";

const logWithTime = (message, ...args) => {
    const date = new Date();
    const h = date.getHours();
    const m = date.getMinutes();
    const s = date.getSeconds();
    const formatedTime = `${h}:${m}:${s}`;

    console.log(formatedTime, message, ...args);
}

exports.trimStr = trimStr;
exports.logWithTime = logWithTime;
