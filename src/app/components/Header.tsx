"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Heart,
  LogOut,
  Package,
  PiggyBank,
  Search,
  ShoppingCart,
  User,
  LogIn, // Icono para Login/Sign Up
  BookOpen, // Icono para About Us
  Info, // Icono para Terms & Use
  Shield, // Icono para Privacy Policy
  LifeBuoy, // Icono para Help
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
  // SIMULACIÓN DE ESTADO DE USUARIO
  // Cambia esto a 'true' o 'false' para probar las dos vistas.
  const isLoggedIn = false; // <<< CAMBIA ESTO PARA VER EL COMPORTAMIENTO
  
  const user = {
    profilePicture: "",
    name: "User Name",
    email: "user@example.com",
  };

  const userPlaceholder = "MA";

  const handleLoginClick = () => {
    console.log("Login clicked");
  };

  const handleProtectionNavegation = (href: string) => {
    console.log("Navigate to:", href);
  };

  const handleLogout = () => {
    console.log("Logout clicked");
  };

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container w-[80%] mx-auto hidden lg:flex items-center justify-between p-4">
        {/* LOGO */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/web-logo.png"
            width={450}
            height={100}
            alt="desktop_logo"
            className="h-15 w-auto"
          />
        </Link>

        {/* BUSCADOR */}
        <div className="flex flex-1 items-center justify-center max-w-xl px-4">
          <div className="relative w-full">
            <Input
              type="text"
              placeholder="Book Name / Author / Subject / Publisher"
              className="w-full pr-10"
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-0 top-1/2 -translate-y-1/2"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* BOTONES DERECHA */}
        <div className="flex items-center gap-4">
          <Link href="/book-sell">
            <Button
              variant="secondary"
              className="bg-yellow-400 text-gray-900 hover:bg-yellow-500"
            >
              Sell Used Book
            </Button>
          </Link>

          {/* MENU DESPLEGABLE */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <Avatar className="w-8 h-8 rounded-full">
                  {isLoggedIn && user.profilePicture ? (
                    <AvatarImage src={user.profilePicture} alt="user_image" />
                  ) : (
                    <AvatarFallback>{userPlaceholder}</AvatarFallback>
                  )}
                </Avatar>
                My Account
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56">
              
              {/* === OPCIÓN PRINCIPAL: LOGIN/PERFIL (CONDICIONAL) === */}
              {isLoggedIn ? (
                <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
              ) : (
                <DropdownMenuItem onClick={handleLoginClick}>
                  <LogIn className="mr-2 h-4 w-4" />
                  <span>Login/Sign Up</span>
                </DropdownMenuItem>
              )}
              
              <DropdownMenuSeparator />

              {/* === SECCIONES DE CUENTA (VISIBLES EN AMBOS ESTADOS) === */}
              {/* Si no está logueado, estas opciones probablemente redirigirán a /login */}
              
              {/* My Profile */}
              <DropdownMenuItem
                onClick={() => handleProtectionNavegation("/account/profile")}
              >
                <User className="mr-2 h-4 w-4" />
                <span>My Profile</span>
              </DropdownMenuItem>

              {/* My Orders */}
              <DropdownMenuItem
                onClick={() => handleProtectionNavegation("/account/orders")}
              >
                <Package className="mr-2 h-4 w-4" />
                <span>My Orders</span>
              </DropdownMenuItem>

              {/* My Selling Orders */}
              <DropdownMenuItem
                onClick={() =>
                  handleProtectionNavegation("/account/selling-products")
                }
              >
                <PiggyBank className="mr-2 h-4 w-4" />
                <span>My Selling Orders</span>
              </DropdownMenuItem>

              {/* Cart */}
              <DropdownMenuItem
                onClick={() => handleProtectionNavegation("/checkout/cart")}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                <span>Cart</span>
              </DropdownMenuItem>

              {/* Wishlist */}
              <DropdownMenuItem
                onClick={() => handleProtectionNavegation("/account/wishlist")}
              >
                <Heart className="mr-2 h-4 w-4" />
                <span>Wishlist</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              
              {/* === SECCIONES DE INFORMACIÓN GENERAL (SIEMPRE VISIBLES) === */}
              
              {/* About Us */}
              <DropdownMenuItem
                onClick={() => handleProtectionNavegation("/about")}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                <span>About Us</span>
              </DropdownMenuItem>

              {/* Terms & Use */}
              <DropdownMenuItem
                onClick={() => handleProtectionNavegation("/terms")}
              >
                <Info className="mr-2 h-4 w-4" />
                <span>Terms & Use</span>
              </DropdownMenuItem>

              {/* Privacy Policy */}
              <DropdownMenuItem
                onClick={() => handleProtectionNavegation("/privacy")}
              >
                <Shield className="mr-2 h-4 w-4" />
                <span>Privacy Policy</span>
              </DropdownMenuItem>

              {/* Help */}
              <DropdownMenuItem
                onClick={() => handleProtectionNavegation("/help")}
              >
                <LifeBuoy className="mr-2 h-4 w-4" />
                <span>Help</span>
              </DropdownMenuItem>


              {/* === OPCIÓN DE CERRAR SESIÓN (SOLO LOGUEADO) === */}
              {isLoggedIn && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;