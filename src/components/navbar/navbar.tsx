"use client";

import type { NavbarProps } from "@nextui-org/react";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Link,
  Button,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import AvatarDropdown from "../avatar-dropdown/avatar-dropdown";

const menuItems = [
  "About",
  "Blog",
  "Customers",
  "Pricing",
  "Enterprise",
  "Changelog",
  "Documentation",
  "Contact Us",
];

interface NavigationBarProps extends NavbarProps {
  //logout: () => Promise<void>;
}

export default function NavigationBar() {
  const router = useRouter();
  const { session, user, logout } = useAuth();
  return (
    <Navbar
      classNames={{
        base: "py-4 backdrop-filter-none bg-transparent",
        wrapper: "px-0 w-full justify-center bg-transparent",
        item: "hidden md:flex",
      }}
      height="54px"
    >
      <NavbarContent
        className="gap-4 rounded-full border-small border-default-200/20 bg-background/60 px-2 shadow-medium backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50"
        justify="center"
      >
        {/* Toggle */}
        <NavbarMenuToggle className="ml-2 text-default-400 md:hidden" />

        {/* Logo */}
        <NavbarBrand className="mr-2 w-[40vw] md:w-auto md:max-w-fit">
          <div className="rounded-full bg-foreground text-background">
            {/* <AcmeIcon size={24} /> */}
            Icon here
          </div>
          <span className="ml-2 font-medium md:hidden">ACME</span>
        </NavbarBrand>

        {/* Items */}
        <NavbarItem className="hidden md:flex">
          <Link className="text-default-500" href="/" size="sm">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-default-500" href="/products" size="sm">
            Products
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link aria-current="page" color="foreground" href="#" size="sm">
            Orders
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link
            aria-current="page"
            color="foreground"
            href="/support"
            size="sm"
          >
            Support
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link
            aria-current="page"
            color="foreground"
            href="/profile"
            size="sm"
          >
            Profile
          </Link>
        </NavbarItem>
        <NavbarItem className="ml-2 !flex">
          {session?.access_token ? (
            <AvatarDropdown
              email={user?.email ?? ""}
              logout={logout}
              links={menuItems}
            />
          ) : (
            <Button
              radius="full"
              variant="flat"
              onClick={() => {
                router.push("/auth");
              }}
            >
              Login
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>

      {/* Menu */}
      <NavbarMenu
        className="top-[calc(var(--navbar-height)/2)] mx-auto mt-16 max-h-[40vh] max-w-[80vw] rounded-large border-small border-default-200/20 bg-background/60 py-6 shadow-medium backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50"
        motionProps={{
          initial: { opacity: 0, y: -20 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -20 },
          transition: {
            ease: "easeInOut",
            duration: 0.2,
          },
        }}
      >
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link className="w-full text-default-500" href="#" size="md">
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
