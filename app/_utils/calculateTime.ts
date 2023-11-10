import type { Expression } from "../types/expression";

// format the time in minutes to a string in the format "hh:mm:ss"
function formatTime(time: number) {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  return `${hours}h ${minutes < 10 ? "0" + minutes : minutes}m`;
}

function parseTime(time: { hours: number; minutes: number }) {
  return time.hours * 60 + time.minutes;
}

export function calculateTime(expressions: Expression[]) {
  let time = 0;
  expressions.forEach((expression) => {
    switch (expression.operator) {
      case "+":
        time += parseTime(expression.time);
        break;
      case "-":
        time -= parseTime(expression.time);
        break;
      case "*":
        time *= parseTime(expression.time);
        break;
      case "/":
        time /= parseTime(expression.time);
        break;
    }
  });

  if (time < 0) return Promise.reject("Time cannot be negative");

  return Promise.resolve({
    time: formatTime(time),
    minutes: time,
  });
}
