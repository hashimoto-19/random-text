import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import Footer from "./components/Footer";

const BASE_URL = "https://b13o.github.io/tech-quotes-api";

function App() {
  async function fetchRandomQuote() {
    // throw new Error("名言の取得に失敗しました (500)");
    const id = Math.floor(Math.random() * 100) + 1;
    const response = await fetch(`${BASE_URL}/api/quotes/${id}`);
    if (!response.ok) {
      throw new Error(`名言の取得に失敗しました (${response.status})`);
    }
    return response.json();
  }
  // 取得した名言のデータを変数で管理
  const [quote, setQuote] = useState(null);

  // ローディング中/エラー発生の状態管理を追加
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // コンポーネント描画時に動作する副作用
  useEffect(() => {
    let active = true;
    fetchRandomQuote()
      .then((quote) => {
        if (active === true) {
          setQuote(quote);
        }
      })
      // エラー発生時の処理
      .catch((error) => {
        if (active === true) {
          setError(error);
        }
      })
      // ローディング中の状態を終了する
      .finally(() => {
        if (active === true) {
          setIsLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, []);

  const handleClick = () => {
    setIsLoading(true);
    setError(null);
    fetchRandomQuote()
      .then((quote) => {
        setQuote(quote);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="bg-gray-100 min-h-screen pt-16 pb-8 space-y-8">
      <Hero handleClick={handleClick} isLoading={isLoading} />

      {/* Quote Card */}
      <div className="flex justify-center">
        <div className="bg-gradient-to-br from-blue-800 to-slate-700 shadow-md space-y-12 rounded-xl w-[720px] min-h-96 p-8">
          <div className="bg-blue-100 text-3xl h-16 w-16 rounded-full flex justify-center items-center">
            💬
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500" />
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-36">
              <div className="text-red-200 text-center">
                <p>エラーが発生しました。</p>
                <p>{error.message}</p>
                <button
                  className="mt-4 bg-black text-white hover:bg-gray-700 flex mx-auto rounded-xl py-4 px-8"
                  type="button"
                  onClick={handleClick}
                >
                  再試行
                </button>
              </div>
            </div>
          ) : (
            <>
              <p className="text-center text-xl text-gray-200">
                {quote?.quote}
              </p>
              <p className="text-gray-300 text-center">by {quote?.author}</p>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
