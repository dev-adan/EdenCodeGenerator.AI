export default function messageToHTML(message) {
  const startString = "<!DOCTYPE html>";
  const endString = "</html>";
  const start = message.indexOf(startString);
  const end = message.indexOf(endString);

  const html = message.slice(start,end + endString.length);
  return html
}
