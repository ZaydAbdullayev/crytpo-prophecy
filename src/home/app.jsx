import { useState, useCallback, useMemo, useEffect } from "react";
import { Card } from "../components/card/card";
import { Baby, Pushshing } from "../components/decorations/decoration";
import "./app.css";
import { coins, coin_ids, prophecys } from "../mocks/coins";
import { MetrixBackground } from "../components/decorations/bg";
import { ProphecyModal } from "../components/card/modal";
import { Loader } from "../components/decorations/loader";
import { LinesBg } from "../components/decorations/lines";
import { getCryptoPrices } from "../context/fetch.service";
import { ShineButton } from "../components/buttons/buttons";
import tg from "../assets/tg.png";
import tw from "../assets/twitter-x-logo-black-square-rounded-20852.png";
// import { TypeAnimation } from "react-type-animation";

export const App = () => {
  const [getInfo, setGetInfo] = useState(false);
  const [activeCoin, setActiveCoin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [prophacy, setProphacy] = useState("");
  const [prices, setPrices] = useState({});

  const questions = useMemo(
    () => ["- When you can becomes rich ?", "- When you lose everything ?"],
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
      setProphacy(prophecys[item.id]);
    }, 3000);
  }, []);

  const close = useCallback(() => {
    setLoading(false);
    setGetInfo(false);
    setActiveCoin(null);
  }, []);

  useEffect(() => {
    getPrices();
  }, []);

  const getPrices = async () => {
    const data = await getCryptoPrices(coin_ids);
    setPrices(data);
  };

  return (
    <div className="w100 df fdc aic jcc gap-20 contents">
      <h1 className="text_3d cp pd-tittle">
        <span>Chamber of Destiny HODL</span>
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
              prices={prices}
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
            <div key={index} className="question">
              {question}
            </div>
          ))}
        </div>
      </div>

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
          // <TypeAnimation
          //   splitter={(str) => str.split(/(?= )/)}
          //   sequence={[prophacy, 10000000, ""]}
          //   speed={{ type: "keyStrokeDelayInMs", value: 50 }}
          //   omitDeletionAnimation={true}
          //   style={{ fontSize: "1em", display: "block", textAlign: "center" }}
          //   repeat={1}
          // />
        )}
      </ProphecyModal>
      <LinesBg />

      <h1 className="text_3d cp pd-tittle">
        <span>Social media</span>
      </h1>

      <div className="df aic gap-20">
        <ShineButton type="tg">
          <img src={tg} alt="tg" />
          Telegram
        </ShineButton>
        <ShineButton type="tw">
          <img src={tw} alt="tw" />
          Twitter
        </ShineButton>
      </div>
    </div>
  );
};
