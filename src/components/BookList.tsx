
import { BookCard } from "./BookCard";
import { Book } from "@/contexts/LibraryContext";
import { useState } from "react";
import { SearchBar } from "./SearchBar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BookListProps {
  books: Book[];
  onCheckout?: (bookId: string) => void;
  onReturn?: (bookId: string) => void;
  onView?: (bookId: string) => void;
}

export function BookList({ books, onCheckout, onReturn, onView }: BookListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setcategoryFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("title");

  // Get unique categories
  const categories = ["all", ...Array.from(new Set(books.map(book => book.category)))];

  // Filter and sort books
  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || book.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || book.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === "title") return a.title.localeCompare(b.title);
    if (sortBy === "author") return a.author.localeCompare(b.author);
    if (sortBy === "year") return a.publishYear.localeCompare(b.publishYear);
    return 0;
  });

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <SearchBar onSearch={setSearchQuery} placeholder="Search books by title or author..." />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Status</label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="checked-out">Checked Out</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Category</label>
            <Select value={categoryFilter} onValueChange={setcategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Sort By</label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title">Title</SelectItem>
                <SelectItem value="author">Author</SelectItem>
                <SelectItem value="year">Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredBooks.length > 0 ? (
          filteredBooks.map(book => (
            <BookCard 
              key={book.id} 
              book={book}
              onCheckout={onCheckout ? () => onCheckout(book.id) : undefined}
              onReturn={onReturn ? () => onReturn(book.id) : undefined}
              onView={onView ? () => onView(book.id) : undefined}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-muted-foreground mb-4">No books match your search criteria.</p>
            <Button onClick={() => {
              setSearchQuery("");
              setStatusFilter("all");
              setcategoryFilter("all");
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
