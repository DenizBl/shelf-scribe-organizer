
import { useParams, useNavigate } from "react-router-dom";
import { useLibrary } from "@/contexts/LibraryContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { toast } from "sonner";

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { books, members, returnBook, removeBook } = useLibrary();
  const navigate = useNavigate();
  
  const book = books.find(book => book.id === id);
  
  if (!book) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <h2 className="text-2xl font-bold mb-4">Book not found</h2>
        <Button onClick={() => navigate("/books")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Books
        </Button>
      </div>
    );
  }
  
  const borrower = book.borrowerId 
    ? members.find(member => member.id === book.borrowerId)
    : null;
  
  const handleDeleteBook = () => {
    removeBook(book.id);
    toast.success("Book removed from the library");
    navigate("/books");
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => navigate("/books")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">{book.title}</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Card>
            <CardContent className="pt-6">
              <div className="aspect-[2/3] mb-4">
                <img 
                  src={book.coverImage || "/placeholder.svg"} 
                  alt={`${book.title} cover`}
                  className="object-cover w-full h-full rounded-md"
                />
              </div>
              
              <div className="flex justify-between items-center">
                <Badge className={book.status === 'available' ? 'bg-library-accent' : 'bg-library-primary'}>
                  {book.status === 'available' ? 'Available' : 'Checked Out'}
                </Badge>
                
                <div className="space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate(`/edit-book/${book.id}`)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Delete Book</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to remove "{book.title}" from your library? This action cannot be undone.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button 
                          variant="destructive" 
                          onClick={handleDeleteBook}
                        >
                          Delete
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Author</h3>
                  <p className="text-lg">{book.author}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">ISBN</h3>
                  <p className="text-lg">{book.isbn}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Publication Year</h3>
                  <p className="text-lg">{book.publishYear}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Category</h3>
                  <p className="text-lg">{book.category}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {book.status === 'checked-out' && borrower && book.dueDate && (
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Checkout Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Borrowed By</h3>
                    <p className="text-lg">{borrower.name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Contact</h3>
                    <p className="text-lg">{borrower.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Due Date</h3>
                    <p className="text-lg">{format(new Date(book.dueDate), 'MMMM d, yyyy')}</p>
                  </div>
                  <div>
                    <Button 
                      onClick={() => {
                        returnBook(book.id);
                        toast.success(`${book.title} has been returned`);
                      }}
                      className="mt-2"
                    >
                      Return Book
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
