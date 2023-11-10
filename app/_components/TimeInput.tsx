"use client";

type TimeInputProps = {
  value: {
    hours: number;
    minutes: number;
  };
  onChange: (value: { hours: number; minutes: number }) => void;
};

export function TimeInput({ value, onChange }: TimeInputProps) {
  const _onChange = ({
    hours,
    minutes,
  }: {
    hours?: string;
    minutes?: string;
  }) => {
    let _hours = typeof hours === "string" ? parseInt(hours.length > 0 ? hours : "0") : value.hours;
    let _minutes = typeof minutes === "string"
      ? parseInt(minutes.length > 0 ? minutes : "0")
      : value.minutes;

    // turn the minutes into hours if it's greater than 60 and adjust the minutes to be the remainder
    if (_minutes > 60) {
      _hours += Math.floor(_minutes / 60);
      _minutes = _minutes % 60;
    }

    onChange({ hours: _hours, minutes: _minutes });
  };

  return (
    <div className="flex flex-row">
      <input
        type="number"
        className="w-24 text-2xl text-center"
        value={value.hours}
        onChange={(e) => _onChange({ hours: e.target.value })}
      />
      <span className="text-2xl mx-2">:</span>
      <input
        type="number"
        className="w-24 text-2xl text-center"
        value={value.minutes}
        onChange={(e) => _onChange({ minutes: e.target.value })}
      />
    </div>
  );
}
