import { Cast } from "@/lib/types";
import { User } from "lucide-react";

interface CastCardProps {
  cast: Cast;
}

export default function CastCard({ cast }: CastCardProps) {
  return (
    <div className="flex flex-col items-center text-center gap-2 min-w-[80px]">
      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border border-white/10 flex items-center justify-center flex-shrink-0">
        <User className="w-6 h-6 text-slate-500" />
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-200 leading-tight">{cast.name}</p>
        <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{cast.character}</p>
      </div>
    </div>
  );
}
