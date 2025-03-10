
import React from 'react';
import { BookCard, BookProps } from './BookCard';

interface FeaturedBooksProps {
  title: string;
  subtitle?: string;
  books: BookProps[];
}

export const FeaturedBooks: React.FC<FeaturedBooksProps> = ({ 
  title, 
  subtitle,
  books
}) => {
  return (
    <section className="py-12">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold">{title}</h2>
          {subtitle && <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">{subtitle}</p>}
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 staggered-fade-in">
          {books.map((book) => (
            <BookCard key={book.id} {...book} />
          ))}
        </div>
      </div>
    </section>
  );
};
