export default function intcomma(str) {
  if (str === undefined || str === null) {
    return "";
  }
  return str
    .toString()
    .replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1 ")
    .replace(/[.,]0$/, "");
}
