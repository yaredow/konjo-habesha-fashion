import SideBar from "@/components/dashboard/SideBar";

function Dashboardlayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <div className="ml-8 min-h-screen w-full">
      <SideBar />
      <div className="flex items-center justify-center p-6">{children}</div>
    </div>
  );
}

export default Dashboardlayout;
