export default function DashboardLoading() {
    return (
        <div className="h-full p-4 md:p-8 space-y-8 animate-pulse">
            {/* Header Skeleton */}
            <div className="flex items-center justify-between">
                <div className="h-8 w-48 bg-white/5 rounded-lg"></div>
                <div className="h-10 w-32 bg-white/5 rounded-lg"></div>
            </div>

            {/* Content Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="h-64 bg-white/5 rounded-xl border border-white/5"></div>
                ))}
            </div>
        </div>
    );
}
