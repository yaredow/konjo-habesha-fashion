import { qucikAccessLinks } from "@/lib/utils/constants";
import NavLink from "../header/NavLink";
import { CiFacebook } from "react-icons/ci";
import { CiTwitter } from "react-icons/ci";
import { CiInstagram } from "react-icons/ci";

function Footer() {
  return (
    <footer className="h-auto border-t px-[10px] md:mt-8 md:px-12 md:py-4">
      <div className=" mx-auto flex flex-col items-center justify-center gap-8">
        <div className=" hidden font-nav md:flex">
          <ul className="flex gap-[1.3rem]">
            {qucikAccessLinks.map((navLink, index) => (
              <li key={index}>
                <NavLink href={navLink.path}>{navLink.name}</NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-row gap-2">
          <div className=" h-12 w-12">
            <CiFacebook className=" text-3xl text-blue-500  hover:text-4xl " />
          </div>

          <div className=" h-12 w-12">
            <CiTwitter className=" text-3xl text-blue-500  hover:text-4xl " />
          </div>

          <div className=" h-12 w-12">
            <CiInstagram className=" text-3xl text-blue-500 hover:text-4xl " />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
