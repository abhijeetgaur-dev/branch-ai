export const LoadingShimmer: React.FC = () => {

  return (
    <div className="mt-8 animate-fade-in pointer-events-none">
      <div className="flex items-start gap-3 py-1 mb-4">
        <div className="w-5 h-5 rounded-full bg-brand-100 border-2 border-brand-200 flex-shrink-0" />
        <div className="h-4 bg-surface-200 rounded animate-pulse" style={{ width: '55%' }} />
      </div>
      <div className="bg-white rounded-xl border border-surface-200 p-4 space-y-3 shadow-sm shadow-surface-900/5">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-emerald-100 animate-pulse flex-shrink-0" />
          <div className="h-3 w-16 bg-surface-100 rounded animate-pulse" />
        </div>
        <div className="border-t border-surface-100" />
        <div className="space-y-2.5 pt-1">
          <div className="h-3 bg-surface-100 rounded animate-pulse w-3/4" />
          <div className="h-3 bg-surface-100 rounded animate-pulse w-full" />
          <div className="h-3 bg-surface-100 rounded animate-pulse w-4/5" />
        </div>
      </div>
    </div>
  );
};
