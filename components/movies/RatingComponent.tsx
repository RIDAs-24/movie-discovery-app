"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingComponentProps {
  initialRating?: number;
  onRate?: (rating: number) => void;
}

export default function RatingComponent({ initialRating = 0, onRate }: RatingComponentProps) {
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(initialRating);

  const handleSelect = (rating: number) => {
    setSelected(rating);
    onRate?.(rating);
  };

  const display = hovered || selected;

  return (
    <div className="space-y-2">
      <p className="text-xs text-slate-400 font-medium">Your Rating</p>
      <div className="flex items-center gap-1.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => handleSelect(star)}
            className="transition-transform hover:scale-110 active:scale-95"
            aria-label={`Rate ${star} stars`}
          >
            <Star
              className={cn(
                "w-7 h-7 transition-all duration-150",
                star <= display
                  ? "text-amber-400 fill-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]"
                  : "text-slate-600"
              )}
            />
          </button>
        ))}
        {selected > 0 && (
          <span className="ml-2 text-sm text-amber-400 font-bold">{selected}/5</span>
        )}
      </div>
    </div>
  );
}
