import React from "react";
import "./decorations.css";

// Utility functions
const random = (from, to) => Math.floor(Math.random() * (to - from + 1) + from);
const pickRandom = (...args) => args[random(0, args.length - 1)];
const getRandomChar = () =>
  String.fromCharCode(
    pickRandom(
      random(0x3041, 0x30ff),
      random(0x2000, 0x206f),
      random(0x0020, 0x003f)
    )
  );

const loop = (callback, delay) => {
  let lastTime = performance.now();
  const animate = (now) => {
    if (now - lastTime >= delay) {
      callback();
      lastTime = now;
    }
    requestAnimationFrame(animate);
  };
  requestAnimationFrame(animate);
};

// Char class
class Char {
  constructor() {
    this.element = document.createElement("span");
    this.mutate();
  }

  mutate() {
    this.element.textContent = getRandomChar();
  }
}

// Trail class
class Trail {
  constructor(chars, { size = 3, offset = 0 } = {}) {
    this.chars = chars;
    this.size = size;
    this.offset = offset;
    this.body = [];
    this.updateBody();
  }

  updateBody() {
    this.body = this.chars.slice(this.offset, this.offset + this.size);
    if (this.body.length < this.size) {
      this.body = [
        ...this.body,
        ...this.chars.slice(0, this.size - this.body.length),
      ];
    }
    this.offset = (this.offset + 1) % this.chars.length;
  }

  traverse(callback) {
    this.body.forEach((char, index) =>
      callback(char, index, index === this.body.length - 1)
    );
  }
}

// Rain class
class Rain {
  constructor({ target, rows }) {
    this.element = document.createElement("p");
    this.chars = this.createChars(rows);
    this.trail = new Trail(this.chars, {
      size: random(3, 15),
      offset: random(0, this.chars.length),
    });

    target.appendChild(this.element);
    this.animateDrop();
  }

  createChars(rows) {
    const fragment = document.createDocumentFragment();
    const chars = [];

    for (let i = 0; i < rows; i++) {
      const char = new Char();
      fragment.appendChild(char.element);
      chars.push(char);

      // Randomly mutate characters
      if (Math.random() < 0.5) {
        loop(() => char.mutate(), random(1000, 5000));
      }
    }

    this.element.appendChild(fragment);
    return chars;
  }

  animateDrop() {
    const delay = random(20, 100);
    const trailLength = this.trail.body.length;

    loop(() => {
      this.trail.updateBody();
      this.trail.traverse((char, index, isLast) => {
        const brightness = (85 / trailLength) * (index + 1);
        char.element.style.color = `hsl(0, 0%, ${brightness}%)`;

        // Her karaktere hafif bir gölge uygula
        char.element.style.textShadow = `
    0 0 0.2em currentColor,
    0 0 0.2em currentColor
  `;

        // Son karakterin gölgesini artır
        if (isLast) {
          char.mutate();
          char.element.style.textShadow = `
      0 0 0.5em #fff,
      0 0 0.5em currentColor
    `;
        }
      });
    }, delay);
  }
}

// React Component
export const MetrixBackground = () => {
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    const container = containerRef.current;
    if (container) {
      for (let i = 0; i < 100; i++) {
        new Rain({ target: container, rows: 100 });
      }
    }
  }, []);

  return <div ref={containerRef} className="main"></div>;
};
