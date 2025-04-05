
import { useLibrary } from "@/contexts/LibraryContext";
import { BookList } from "@/components/BookList";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookPlus } from "lucide-react";

const Books = () => {
  const { books, returnBook, canEditBooks } = useLibrary();
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Books</h1>
          <p className="text-muted-foreground">Manage your library collection</p>
        </div>
        
        {canEditBooks() && (
          <Button 
            onClick={() => navigate("/add-book")}
            className="bg-library-primary hover:bg-library-primary/90"
          >
            <BookPlus className="mr-2 h-4 w-4" />
            Add New Book
          </Button>
        )}
      </div>
      
      <BookList 
        books={books}
        onReturn={(bookId) => returnBook(bookId)} 
        onView={(bookId) => navigate(`/books/${bookId}`)}
      />
    </div>
  );
};

export default Books;
