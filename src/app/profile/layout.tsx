import SidebarMenu from "./_components/SidebarMenu";

type ProfileLayoutProps = {
  children: React.ReactNode;
};

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  return (
    <div className="ml-8 min-h-screen w-full">
      <SidebarMenu />
      <div className="flex items-center justify-center p-6">{children}</div>
    </div>
  );
}
