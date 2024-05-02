import { auth } from "@/auth";
import HeaderComp from "./HeaderComp";

export default async function Header() {
  const session = await auth();
  const user = session?.user;
  return <HeaderComp user={user} />;
}
