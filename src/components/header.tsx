'use client';

import { useMediaQuery } from '@/hook/use-media-query';
import { Drawer, DrawerContent, DrawerTrigger } from './ui/drawer';
import { MenuIcon } from 'lucide-react';
import Link from 'next/link';
import { CiUser } from 'react-icons/ci';

function Header() {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  return isDesktop ? (
    <div>Desktop</div>
  ) : (
    <div>
      <Drawer direction="left">
        <div className=" flex justify-end">
          <DrawerTrigger>
            <MenuIcon />
          </DrawerTrigger>
        </div>
        <DrawerContent>
          <div className="flex mt-8 mx-4 gap-4 flex-col">
            <div className="flex justify-center flex-col gap-4 items-start border-b">
              <Link href="/home">Home</Link>
              <Link href="/shop">Shop</Link>
              <Link href="/contact">Contact</Link>
            </div>

            <div className=" flex flex-row">
              <CiUser className=" text-xl" />
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default Header;
