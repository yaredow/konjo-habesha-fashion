import { Separator } from "@/components/ui/separator";
import Link from "next/link";

type SideBarMenuProps = {
  icon: React.ComponentType<any>;
  link: string;
  label: string;
};

function SidebarMenu({ icon: Icon, link, label }: SideBarMenuProps) {
  return (
    <li className=" flex flex-col gap-10">
      <Link className="flex items-center justify-between space-x-6" href={link}>
        <span className=" text-sm">{label}</span>
        <Icon className="h-4 w-4" />
      </Link>
    </li>
  );
}

export default SidebarMenu;
