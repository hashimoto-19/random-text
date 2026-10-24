import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import Footer from "./components/Footer";

const BASE_URL = "https://b13o.github.io/tech-quotes-api";

function App() {
  async function fetchRandomQuote() {
    const id = Math.floor(Math.random() * 100) + 1;
    const response = await fetch(`${BASE_URL}/api/quotes/${id}`);
    return response.json();
  }
  // 取得した名言のデータを変数で管理
  const [quote, setQuote] = useState(null);

  // コンポーネント描画時に動作する副作用
  useEffect(() => {
    let active = true;
    fetchRandomQuote().then((quote) => {
      if (active) {
        setQuote(quote);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen pt-16 pb-8 space-y-8">
      <Hero />

      {/* Quote Card */}
      <div className="flex justify-center">
        <div className="bg-gradient-to-br from-blue-800 to-slate-700 shadow-md space-y-12 rounded-xl w-[720px] min-h-96 p-8">
          <div className="bg-blue-100 text-3xl h-16 w-16 rounded-full flex justify-center items-center">
            💬
          </div>

          <p className="text-center text-xl text-gray-200">{quote?.quote}</p>

          <p className="text-gray-300 text-center">by {quote?.author}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
