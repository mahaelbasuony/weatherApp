import "./flagEmoji.css";
function FlagEmoji({ countryCode }) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());

  return <span className="flag">{String.fromCodePoint(...codePoints)}</span>;
}

export default FlagEmoji;
