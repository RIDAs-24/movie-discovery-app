export default function MovieDetailLoading() {
  return (
    <div className="max-w-5xl mx-auto animate-pulse">
      {/* Backdrop skeleton */}
      <div className="relative h-[420px] w-full bg-slate-800/60 rounded-none lg:rounded-b-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        {/* Poster skeleton inside backdrop */}
        <div className="absolute bottom-6 left-8 w-36 h-52 rounded-xl bg-slate-700/80" />
        {/* Text skeletons */}
        <div className="absolute bottom-6 left-52 space-y-3">
          <div className="h-3 w-24 bg-slate-700 rounded-full" />
          <div className="h-8 w-72 bg-slate-700 rounded-xl" />
          <div className="h-4 w-48 bg-slate-700/60 rounded-full" />
          <div className="flex gap-2 mt-2">
            <div className="h-6 w-16 bg-slate-700 rounded-full" />
            <div className="h-6 w-16 bg-slate-700 rounded-full" />
          </div>
          <div className="flex gap-4 mt-2">
            <div className="h-4 w-20 bg-slate-700/60 rounded-full" />
            <div className="h-4 w-20 bg-slate-700/60 rounded-full" />
            <div className="h-4 w-20 bg-slate-700/60 rounded-full" />
          </div>
        </div>
      </div>

      {/* Body skeletons */}
      <div className="px-6 lg:px-10 py-8 space-y-8">
        {/* Overview */}
        <div className="space-y-3">
          <div className="h-5 w-32 bg-slate-800 rounded-lg" />
          <div className="space-y-2">
            <div className="h-3 w-full bg-slate-800/80 rounded-full" />
            <div className="h-3 w-full bg-slate-800/80 rounded-full" />
            <div className="h-3 w-3/4 bg-slate-800/80 rounded-full" />
          </div>
        </div>

        {/* Cast row */}
        <div className="space-y-3">
          <div className="h-5 w-24 bg-slate-800 rounded-lg" />
          <div className="flex gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-full bg-slate-800" />
                <div className="h-2 w-14 bg-slate-800 rounded-full" />
                <div className="h-2 w-10 bg-slate-700 rounded-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Trailer skeleton */}
        <div className="space-y-3">
          <div className="h-5 w-28 bg-slate-800 rounded-lg" />
          <div className="h-56 w-full max-w-2xl bg-slate-800 rounded-2xl" />
        </div>

        {/* Similar movies row */}
        <div className="space-y-3">
          <div className="h-5 w-36 bg-slate-800 rounded-lg" />
          <div className="flex gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-32 flex-shrink-0">
                <div className="h-44 bg-slate-800 rounded-xl" />
                <div className="mt-2 h-3 w-24 bg-slate-800 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
