import { FC } from "react";
import "./flagEmoji.css";
type Props={
  countryCode: string
}
const FlagEmoji:FC<Props>=({ countryCode }) =>{
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));

  return <span className="flag">{String.fromCodePoint(...codePoints)}</span>;
}

export default FlagEmoji;
