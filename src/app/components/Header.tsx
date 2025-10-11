import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Ghost, Search } from "lucide-react";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";


const Header = () => {
  return (
    <header className="border-b bg-white sticky top-0 z-50">
      {/* Desktop header */}
      <div className="container w-[80%] mx-auto hidden lg:flex items-center justify-between p-4">
        <Link href='/' className="flex items-center">
          <Image
            src="/images/web-logo.png"
            width={450}
            height={100}
            alt='desktop_logo'
            className='h-15 w-auto'
          />
        </Link>
        <div className="flex flex-1 items-center justify-center max-w-xl px-4">
          <div className="relative w-full">
            <Input
            type="text"
            placeholder="Book Name / Author / Subject/ Publisher"
            className="w-full pr-10"
            />
            <Button
            size='icon'
            variant='ghost'
            className="absolute right-0 top-1/2 -translate-y-1/2"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href='/book-sell'>
          <Button variant="secondary" className="bg-yellow-400 text-gray-900 hover:bg-yellow-500">
            sell Used Book
          </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost'>
                <Avatar className="w-8 h-8 rounded-full">
                  <AvatarImage alt="user_image"></AvatarImage>
                  <AvatarFallback>MA</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
