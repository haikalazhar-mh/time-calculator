"use client";

import { calculateTime } from "../_utils/calculateTime";
import type { Expression, Operator } from "../types/expression";
import { TimeInput } from "./TimeInput";

import { useEffect, useState } from "react";

export function Expressions() {
  const [expressions, setExpressions] = useState<Expression[]>([]);
  const [result, setResult] = useState<{
    time: string;
    minutes: number;
  }>();

  useEffect(() => {
    window.onbeforeunload = (ev) => {
      return true;
    };

    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  const addExpression = (operator?: Operator) => {
    // RESET
    setResult(undefined);
    setExpressions((expressions) => [
      ...expressions,
      {
        time: {
          hours: 0,
          minutes: 0,
        },
        operator: operator ?? "+",
      },
    ]);
  };

  const removeExpression = (index: number) => {
    // RESET
    setResult(undefined);

    setExpressions((expressions) => {
      const newExpressions = [...expressions];
      newExpressions.splice(index, 1);
      return newExpressions;
    });
  };

  const updateExpression = (index: number, expression: Expression) => {
    setResult(undefined);

    setExpressions((expressions) => {
      const newExpressions = [...expressions];
      newExpressions[index] = expression;
      return newExpressions;
    });
  };

  const evaluate = async () => {
    calculateTime(expressions)
      .then((time) => setResult(time))
      .catch(console.error);
  };

  return (
    <div>
      <ul className="container flex flex-col items-center justify-start gap-10">
        {expressions.length === 0 && (
          <li>
            <button
              onClick={() => addExpression()}
              className="px-3 py-1 rounded-md border border-gray-200 text-sm"
            >
              Add
            </button>
          </li>
        )}

        {expressions.map((expression, index) => (
          <li key={index} className="flex flex-col gap-8 items-center">
            {index !== 0 && (
              <select
                className="px-3 py-1 rounded-md border border-gray-200 text-sm"
                value={expression.operator}
                onChange={(e) =>
                  updateExpression(index, {
                    ...expression,
                    operator: e.target.value as Operator,
                  })
                }
              >
                <option value="+">+</option>
                <option value="-">-</option>
              </select>
            )}
            <div className="flex flex-row gap-5">
              <TimeInput
                value={expression.time}
                onChange={(time) =>
                  updateExpression(index, { ...expression, time })
                }
              />

              <button
                onClick={() => removeExpression(index)}
                className="px-3 py-1 rounded-md border border-gray-200 text-sm"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
        {expressions.length > 0 && (
          <li className="flex flex-row gap-3 py-10">
            <button
              onClick={() => addExpression("+")}
              className="px-3 py-1 rounded-md border border-gray-200 text-sm"
            >
              +
            </button>
            <button
              onClick={() => addExpression("-")}
              className="px-3 py-1 rounded-md border border-gray-200 text-sm"
            >
              -
            </button>
          </li>
        )}
      </ul>

      {expressions.length > 1 && (
        <div className="flex w-full flex-col justify-center gap-5">
          <button
            onClick={evaluate}
            className="px-3 py-1 rounded-md border border-gray-200 text-lg mt-10"
          >
            Evaluate
          </button>
          {result && (
            <div className="flex flex-col gap-5">
              <h3 className="text-2xl">Result</h3>
              <p className="text-2xl">
                {" "}
                hh:mm <strong>{result.time}</strong>
              </p>
              <p className="text-2xl">
                minutes <strong>{result.minutes}</strong>
              </p>
              <p className="text-2xl">
                hours <strong>{result.minutes / 60}</strong>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
