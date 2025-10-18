import React, { useEffect, useState } from "react";
import { books } from "@/lib/Constant";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const NewBooks = () => {
  const [currentBookSlide, setCurrentBookSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBookSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentBookSlide((prev) => (prev - 1 + 3) % 3);
  };

  const NextSlide = () => {
    setCurrentBookSlide((prev) => (prev + 1) % 3);
  };

  const calculateDiscount = (price: number, finalPrice: number): number => {
    if (price > finalPrice && price > 0) {
      return Math.round(((price - finalPrice) / price) * 100);
    }
    return 0;
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Newly added Books
        </h2>
        <div className="relative">
          {books.length > 0 ? (
            <>
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentBookSlide * 100}%)` }}
                >
                  {[0, 1, 2].map((slideIndex) => (
                    <div key={slideIndex} className="flex-none w-full">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
                        {books
                          .slice(slideIndex * 3, slideIndex * 3 + 3)
                          .map((book) => (
                            <Card key={book._id} className="relative">
                              <CardContent className="p-4">
                                <Link href={`books/${book._id}`}>
                                  <div className="relative">
                                    <Image
                                      src={book.images[0]}
                                      alt={book.title}
                                      width={200}
                                      height={300}
                                      className="mb-4 h-[200px] w-full object-cover rounded-md"
                                    />
                                    {calculateDiscount(
                                      book.price,
                                      book.finalPrice
                                    ) > 0 && (
                                      <span className="absolute left-0 top-2 rounded-r-lg bg-red-500 px-2 py-1 text-xs font-medium text-white">
                                        {calculateDiscount(
                                          book.price,
                                          book.finalPrice
                                        )}{" "}
                                        %off
                                      </span>
                                    )}
                                  </div>
                                  <h3 className="mb-2 line-clamp-2 text-sm font-medium">
                                    {book.title}
                                  </h3>
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-baseline gap-2">
                                      <span className="text-lg font-bold">${book.finalPrice}</span>
                                      {book.price && (
                                        <span className="text-sm text-muted-foreground line-through">${book.price}</span>
                                      )}
                                    </div>
                                    <div className="flex justify-between items-center text-xs text-zinc-400">
                                      <span>{book.condition}</span>

                                    </div>
                                  </div>
                                  <div className="pt-4">
                                    <Button className=" flex float-end mb-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:bg-orange-600 hover:from-orange-600 hover:to-orange-600 ">
                                      Buy Now
                                    </Button>
                                  </div>
                                </Link>
                              </CardContent>
                            </Card>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/*scroll button*/}
              <button className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
              onClick={prevSlide}>
              <ChevronLeft className="h-6 w-6"/>
              </button>

              <button className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
              onClick={NextSlide}>
              <ChevronRight className="h-6 w-6"/>
              </button>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewBooks;
