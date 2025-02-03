import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://api.freecurrencyapi.com/v1/latest";
const API_KEY = "fca_live_YYXg27tjrtpaaME4SuQEfGYPQ3MA4EUo1sm1fkTq";

function Currency() {
  const [amount, setAmount] = useState(""); // Miktar
  const [currencies, setCurrencies] = useState([]); // Tüm döviz türleri
  const [fromCurrency, setFromCurrency] = useState("USD"); // Seçilen giriş dövizi
  const [toCurrency, setToCurrency] = useState("TRY"); // Seçilen hedef dövizi
  const [result, setResult] = useState(""); // Çıktı sonucu

  // API'den Döviz Türlerini Çekme
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}`);
        const currencyList = Object.keys(response.data.data);
        setCurrencies(currencyList);
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      }
    };
    fetchData();
  }, []);

  // Döviz Çevirme İşlemi
  const exchange = async () => {
    if (!amount) {
      alert("Lütfen bir miktar giriniz!");
      return;
    }
    try {
      const response = await axios.get(
        `${BASE_URL}?apikey=${API_KEY}&base_currency=${fromCurrency}`
      );
      const exchangeRate = response.data.data[toCurrency];
      const exchangeResult = (exchangeRate * amount).toFixed(2);
      setResult(exchangeResult);
    } catch (error) {
      console.error("Döviz çevirme hatası:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card bg-base-100 w-96 shadow-xl p-6">
        <h2 className="card-title text-center text-lg font-bold">Döviz Çevirici</h2>
        <div className="card-body space-y-4">
          {/* İlk Girdi Alanı */}
          <div className="flex items-center gap-2">
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
              placeholder="Miktar"
              className="input input-bordered w-full"
            />
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="select select-bordered"
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>

          {/* İkinci Girdi Alanı */}
          <div className="flex items-center gap-2">
            <input
              value={result}
              type="text"
              className="input input-bordered w-full"
              placeholder="Sonuç"
              readOnly
            />
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="select select-bordered"
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>

          {/* Buton */}
          <div className="card-actions justify-center">
            <button onClick={exchange} className="btn btn-primary w-full">
              Çevir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Currency;
