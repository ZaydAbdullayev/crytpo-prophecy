import { useState, useCallback, useMemo } from "react";
import { Card } from "../components/card/card";
import { Baby, Pushshing } from "../components/decorations/decoration";
import "./app.css";
import { coins } from "../mocks/coins";
import { Comments } from "../components/comments/comments";
import { MetrixBackground } from "../components/decorations/bg";
import { ProphecyModal } from "../components/card/modal";
import { Loader } from "../components/decorations/loader";
import { LinesBg } from "../components/decorations/lines";

export const App = () => {
  const [getInfo, setGetInfo] = useState(false);
  const [activeCoin, setActiveCoin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [prophacy, setProphacy] = useState("");

  const questions = useMemo(
    () => ["- Когда станет богатым ?", "- Когда потеряет все ?"],
    []
  );

  const isOdd = useCallback((number) => number % 2 !== 0, []);

  const getInformation = useCallback((item) => {
    setActiveCoin(item);
    setGetInfo(true);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setGetInfo(false);
      setProphacy(
        "Вы станете миллионером через 5 лет, если будете держать Bitcoin на протяжении следующих 3 лет, а затем увидите резкий рост."
      );
    }, 3000);
  }, []);

  const close = useCallback(() => {
    setLoading(false);
    setGetInfo(false);
    setActiveCoin(null);
  }, []);

  return (
    <div className="w100 df fdc aic jcc gap-20 contents">
      <h1 className="text_3d cp pd-tittle">
        <span>Палата судьбы HODL</span>
      </h1>
      <div className="text">
        <h1 className="A">Welcome to our crypto prophecy website</h1>
        <h1 className="B">You can get info about crypto analiz in here</h1>
      </div>
      <h1 className="text_3d cp pd-tittle">
        <span>Coins</span>
      </h1>
      {coins.map((row, rowIndex) => (
        <div className="df aife jcc gap-10 p-r card-container" key={rowIndex}>
          {isOdd(rowIndex) && <Pushshing type="normal" />}
          {row.map((coin) => (
            <Card
              key={coin.id}
              item={coin}
              onClick={() => getInformation(coin)}
            />
          ))}
          {!isOdd(rowIndex) && <Pushshing type="reverse" />}
        </div>
      ))}

      <h1 className="text_3d cp pd-tittle">
        <span>Questions</span>
      </h1>
      <div className="df aic gap-20 questions">
        <Baby />
        <div className="df fdc">
          {questions.map((question, index) => (
            <div
              key={index}
              className="typing-demo"
              style={{ width: `${question.length}ch` }}
            >
              {question}
            </div>
          ))}
        </div>
      </div>

      <h1 className="text_3d cp pd-tittle">
        <span>Comments</span>
      </h1>
      <Comments />

      {getInfo && (
        <div className="div">
          <MetrixBackground />
        </div>
      )}

      <ProphecyModal
        item={activeCoin}
        className={`df aic jcc modal-container ${activeCoin ? "open" : ""} ${
          !getInfo ? "blur" : ""
        }`}
        close={close}
      >
        {loading ? (
          <>
            <Loader />
            <h2>All data about bitcoin is analyzing...</h2>
          </>
        ) : (
          <i>{prophacy}</i>
        )}
      </ProphecyModal>
      <LinesBg />
    </div>
  );
};
