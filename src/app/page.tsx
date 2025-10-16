"use client"; // Indica que este componente se ejecuta del lado del cliente (React/Next.js con interactividad)

import { Button } from "@/components/ui/button"; // Importa el componente de botón personalizado
import {
  BookOpen,
  Camera,
  CreditCard,
  Library,
  Search,
  ShoppingBag,
  Store,
  Tag,
  Truck,
  Wallet,
} from "lucide-react"; // Íconos usados en las distintas secciones
import Image from "next/image"; // Componente optimizado de imágenes de Next.js
import { useEffect, useState } from "react"; // Hooks de React
import Link from "next/link"; // Para navegación interna sin recargar página
import NewBooks from "./components/NewBooks"; // Componente que muestra los libros nuevos

export default function Home() {
  // 🖼️ Imágenes del banner principal
  const bannerImages = [
    "/images/book1.jpg",
    "/images/book2.jpg",
    "/images/book3.jpg",
  ];

  // 📚 Publicaciones del blog (no se renderizan en este fragmento)
  const blogPosts = [
    {
      imageSrc:
        "https://images.unsplash.com/photo-1604866830893-c13cafa515d5?w=800&auto=format&fit=crop&q=60",
      title: "Where and how to sell old books online?",
      description:
        "Get started with selling your used books online and earn money from your old books.",
      icon: <BookOpen className="w-6 h-6 text-primary" />,
    },
    {
      imageSrc:
        "https://media.istockphoto.com/id/910384920/photo/kid-reading-near-locked-door.webp",
      title: "What to do with old books?",
      description:
        "Learn about different ways to make use of your old books and get value from them.",
      icon: <Library className="w-6 h-6 text-primary" />,
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1492539438225-2666b2a98f93?w=800&auto=format&fit=crop&q=60",
      title: "What is BookKart?",
      description:
        "Discover how BookKart helps you buy and sell used books online easily.",
      icon: <Store className="w-6 h-6 text-primary" />,
    },
  ];

  // 🟡 Pasos para vender libros
  const sellSteps = [
    {
      step: "Step 1",
      title: "Post an ad for selling used books",
      description:
        "Post an ad on BookKart describing your book details to sell your old books online.",
      icon: <Camera className="h-8 w-8 text-primary" />,
    },
    {
      step: "Step 2",
      title: "Set the selling price for your books",
      description:
        "Set the price for your books at which you want to sell them.",
      icon: <Tag className="h-8 w-8 text-primary" />,
    },
    {
      step: "Step 3",
      title: "Get paid into your UPI/Bank account",
      description:
        "You will get money into your account once you receive an order for your book.",
      icon: <Wallet className="h-8 w-8 text-primary" />,
    },
  ];

  // 🔵 Pasos para comprar libros
  const buySteps = [
    {
      step: "Step 1",
      title: "Select the used books you want",
      description:
        "Search from over thousands of used books listed on BookKart.",
      icon: <Search className="h-8 w-8 text-primary" />,
    },
    {
      step: "Step 2",
      title: "Place the order by making payment",
      description:
        "Then simply place the order by clicking on the 'Buy Now' button.",
      icon: <CreditCard className="h-8 w-8 text-primary" />,
    },
    {
      step: "Step 3",
      title: "Get the books delivered at your doorstep",
      description: "The books will be delivered to you at your doorstep!",
      icon: <Truck className="h-8 w-8 text-primary" />,
    },
  ];

  // 📸 Estado para controlar qué imagen del banner se muestra
  const [currentImage, setCurrentImage] = useState(0);

  // ⏱️ Efecto que cambia la imagen del banner cada 5 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % bannerImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen">
      {/* 🟣 Banner principal con imágenes rotativas */}
      <section className="relative h-[600px] overflow-hidden">
        {bannerImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 -transition-opacity duration-1000 ${
              currentImage === index ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Imagen de fondo */}
            <Image
              src={image}
              fill
              alt="banner"
              className="object-cover"
              priority={index === 0}
            />
            {/* Capa oscura sobre la imagen */}
            <div className="absolute inset-0 bg-black/50" />
          </div>
        ))}

        {/* Texto e información del banner */}
        <div className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center text-white text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-8">
            Buy and Sell Old Books Online in Argentina
          </h1>

          {/* Botones principales */}
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Botón para comprar */}
            <Button
              size="lg"
              className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-6 rounded-xl"
            >
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg group-hover:bg-white/30 translation-colors">
                  <ShoppingBag className="h-6 w-6" />
                </div>
                <Link href="/Books">
                  <div className="text-left">
                    <div className="text-sm opacity-90">Start Shopping</div>
                    <div className="font-semibold">Buy Used Books</div>
                  </div>
                </Link>
              </div>
            </Button>

            {/* Botón para vender */}
            <Button
              size="lg"
              className="group bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black px-8 py-6 rounded-xl"
            >
              <div className="flex items-center gap-3">
                <div className="bg-black/20 p-2 rounded-lg group-hover:bg-black/30 translation-colors">
                  <ShoppingBag className="h-6 w-6" />
                </div>
                <Link href="/Books-sell">
                  <div className="text-left">
                    <div className="text-sm opacity-90">Start Selling</div>
                    <div className="font-semibold">Sell Old Books</div>
                  </div>
                </Link>
              </div>
            </Button>
          </div>
        </div>
      </section>

      {/* 🟢 Sección de libros nuevos */}
      <NewBooks />

      {/* Botón para explorar más libros */}
      <Button
        size="lg"
        className="flex mt-10 mb-10 mx-auto bg-yellow-500 px-8 py-6 rounded-xl"
      >
        <Link href="/Books">
          <div className="text-sm">Explore All Books</div>
        </Link>
      </Button>

      {/* 🔹 Sección "How to Sell" */}
      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          {/* Título y descripción */}
          <div className="text-center mb-4">
            <h2 className="text-3xl font-bold mb-4">
              How to SELL your old books online on BookKart?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Earning money by selling your old books is just 3 steps away from
              you :)
            </p>
          </div>

          {/* Tarjetas de pasos */}
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Línea discontinua de conexión */}
            <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 border-t-2 border-dashed border-gray-300 -z-10"></div>

            {/* Itera sobre cada paso de venta */}
            {sellSteps.map((step, index) => (
              <div className="relative flex flex-col h-full" key={index}>
                <div className="bg-white rounded-xl p-8 shadow-lg text-center flex-grow flex flex-col">
                  <div className="absolute top-2 left-14 -translate-x-1/2 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-medium z-10">
                    {step.step}
                  </div>
                  <div className="w-16 h-16 mb-2 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                    {step.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm flex-grow">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔸 Sección "How to Buy" */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          {/* Título y descripción */}
          <div className="text-center mb-4">
            <h2 className="text-3xl font-bold mb-4">
              How to BUY second hand books online on BookKart?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Saving some good amount of money by buying used books is just 3
              steps away from you :)
            </p>
          </div>

          {/* Tarjetas de pasos */}
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Línea discontinua */}
            <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 border-t-2 border-dashed border-gray-300 -z-10"></div>

            {/* Itera sobre cada paso de compra */}
            {buySteps.map((step, index) => (
              <div className="relative flex flex-col h-full" key={index}>
                <div className="bg-yellow-400 rounded-xl p-8 shadow-lg text-center flex-grow flex flex-col">
                  <div className="absolute top-2 left-14 -translate-x-1/2 bg-white text-black px-4 py-1 rounded-full text-sm font-medium z-10">
                    {step.step}
                  </div>
                  <div className="w-16 h-16 mb-2 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                    {step.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm flex-grow">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    {/* blog post */}

    <section className="py-16 bg-[rgb(221,234,254)]">
      <div className="container mx-auto px-4">
        <h2>Read from our <span className="text-primary">Blog</span></h2>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {blogPosts.map((post,index) => (
          <div className="" key={index}>

          </div>
        ))}
      </div>
    </section>
    </main>
  );
}
