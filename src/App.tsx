import { useState } from "react";
import "./styles.css";

interface infoProps {
  symbol: string;
  longName: string;
  regularMarketPrice: string;
  logourl: string;
}

export default function App() {
  const [ticker, setTicker] = useState("");
  const [info, setInfo] = useState<infoProps | null>(null);

  function handleChange(event: any) {
    setTicker(event.target.value);
  }

  const lerDados = async () => {
    if (ticker === "") return alert("Ticker nao pode ser vazio");

    const res = await fetch(
      `https://brapi.dev/api/quote/${ticker}?range=1d&interval=1d&fundamental=true`
    );
    const { results } = await res.json();
    const { symbol, longName, regularMarketPrice, logourl } = await results[0];
    const dataFetched = {
      symbol,
      longName,
      regularMarketPrice,
      logourl
    };
    console.log(dataFetched);
    setInfo(dataFetched);
    setTicker("");
  };

  return (
    <div className="App">
      <strong>Pesquise o valor de um Ativo</strong>
      <form>
        <label htmlFor="name">TICKER Bolsa: </label>
        <input value={ticker} onChange={handleChange} id="name" />
      </form>
      <button onClick={lerDados}>Pesquisar</button>

      {info && (
        <div>
          <p>Dados Recuperados:</p>
          <strong>{`Simbolo: ${info.symbol}`}</strong>
          <h3>{`Nome: ${info.longName}`}</h3>
          <h5>{`Preço: ${info.regularMarketPrice}`}</h5>

          <img src={`${info.logourl}`} alt={`${info.symbol}`} />
        </div>
      )}
    </div>
  );
}
