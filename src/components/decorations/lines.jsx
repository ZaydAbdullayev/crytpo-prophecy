
export const LinesBg = () => {
  const lines = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="w100 p-r df aic jcc lines-container">
      {lines.map((line, index) => (
        <div className="lines" key={`line-${index}-${line}`}>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
      ))}
    </div>
  );
};
