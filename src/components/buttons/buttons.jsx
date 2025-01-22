import "./button.css";
import gif from "../../assets/2yqT.gif";

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

const ShineButton = ({ children, type }) => {
  return (
    <button
      className={`df aic gap-10 button-universal-size button-shine gelatine ${type}`}
      role="button"
    >
      {children}
    </button>
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

export { GlitchButton, ShineButton, SoonButton };
