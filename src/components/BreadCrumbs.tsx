"use client";

import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { usePathname } from "next/navigation";

export default function BreadCrumb() {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);
  return (
    <Breadcrumb className=" my-2 hidden md:mx-12 md:flex">
      <BreadcrumbList>
        <BreadcrumbItem>
          {pathNames.map((link, index) => {
            const href = `/${pathNames.slice(0, index + 1).join("/")}`;
            const linkName =
              link[0].toUpperCase() + link.slice(1, link.length - 1);
            const isLastPath = pathNames.length === index + 1;
            return (
              <div key={index}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {!isLastPath ? (
                    <BreadcrumbLink asChild>
                      <Link href={href}>{linkName}</Link>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{linkName}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              </div>
            );
          })}
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
