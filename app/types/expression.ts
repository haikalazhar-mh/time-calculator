export type Operator = "+" | "-" | "*" | "/";

export type Expression = {
  operator: Operator;
  time: {
    hours: number;
    minutes: number;
  }; // time in minutes
};
