import SideBarMenu from "./(profile)/_components/SidebarMenu";

type ProfileLayoutProps = {
  children: React.ReactNode;
};

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  return (
    <div className=" min-h-screen  w-full md:ml-8 ">
      <SideBarMenu />
      <div className="flex items-center justify-center p-6">{children}</div>
    </div>
  );
}
