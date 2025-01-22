import { LuLoaderPinwheel } from "react-icons/lu";

export const Loader = ({ small = false }) => {
  return (
    <span className={`df aic jcc loader-box ${small && "small"}`}>
      <LuLoaderPinwheel />
    </span>
  );
};
