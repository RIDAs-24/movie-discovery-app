"use client";

interface RangeSliderProps {
  min: number;
  max: number;
  value: [number, number];
  step?: number;
  onChange: (value: [number, number]) => void;
  label: string;
  formatValue?: (v: number) => string;
}

export default function RangeSlider({
  min,
  max,
  value,
  step = 1,
  onChange,
  label,
  formatValue,
}: RangeSliderProps) {
  const fmt = formatValue ?? ((v: number) => String(v));

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-300">{label}</span>
        <span className="text-sm text-cyan-400 font-mono">
          {fmt(value[0])} – {fmt(value[1])}
        </span>
      </div>
      <div className="space-y-2">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value[0]}
          onChange={(e) => {
            const v = Number(e.target.value);
            if (v <= value[1]) onChange([v, value[1]]);
          }}
          className="w-full accent-cyan-400"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value[1]}
          onChange={(e) => {
            const v = Number(e.target.value);
            if (v >= value[0]) onChange([value[0], v]);
          }}
          className="w-full accent-cyan-400"
        />
      </div>
    </div>
  );
}
