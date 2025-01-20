import "./button.css";
import gif from "../../assets/2yqT.gif";
import pushshing from "../../assets/picmix.com_2376499.gif";

const GlitchButton = ({ children }) => {
  return (
    <button
      className={`button-universal-size button-glitch animation`}
      role="button"
    >
      {children}
    </button>
  );
};

const ShineButton = ({ children }) => {
  return (
    <button
      className={`button-universal-size button-shine gelatine`}
      role="button"
    >
      {children}
    </button>
  );
};

const NotAvaibleButton = ({ children }) => {
  return (
    <div className="not-avaible-container">
      <img src={pushshing} alt="not avaible" className="not-avaible-gif" />
      <div className="letterpress">
        <p>{children}</p>
      </div>
    
    </div>
  );
};

const SoonButton = ({ children }) => {
  return (
    <div className="soon-container">
      <img src={gif} alt="soon" className="soon-gif" />
      <button
        className={`button-universal-size button-shine gelatine soon`}
        role="button"
      >
        {children}
      </button>
    </div>
  );
};

export { GlitchButton, ShineButton, NotAvaibleButton, SoonButton };
