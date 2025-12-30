import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-background overflow-hidden">
            <Sidebar />
            <main className="flex-1 flex flex-col min-w-0 overflow-y-auto pt-14 md:pt-0 md:ml-64 h-full">
                {children}
            </main>
        </div>
    );
}
