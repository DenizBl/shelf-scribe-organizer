
import { Book as BookType } from "@/contexts/LibraryContext";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User } from "lucide-react";
import { format } from "date-fns";

interface BookCardProps {
  book: BookType;
  onCheckout?: () => void;
  onReturn?: () => void;
  onView?: () => void;
}

export function BookCard({ book, onCheckout, onReturn, onView }: BookCardProps) {
  const isCheckedOut = book.status === 'checked-out';
  
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="aspect-[2/3] relative overflow-hidden">
        <img 
          src={book.coverImage || '/placeholder.svg'} 
          alt={`${book.title} cover`}
          className="object-cover w-full h-full transition-transform hover:scale-105"
        />
        <Badge 
          className={`absolute top-2 right-2 ${
            isCheckedOut ? 'bg-library-primary' : 'bg-library-accent'
          }`}
        >
          {isCheckedOut ? 'Checked Out' : 'Available'}
        </Badge>
      </div>
      <CardContent className="pt-4 flex-1">
        <h3 className="font-bold line-clamp-1">{book.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-1">{book.author}</p>
        
        {isCheckedOut && book.dueDate && (
          <div className="mt-2 flex items-center text-xs text-muted-foreground">
            <Calendar className="h-3 w-3 mr-1" />
            <span>Due: {format(new Date(book.dueDate), 'MMM d, yyyy')}</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-0 pb-4 gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
          onClick={onView}
        >
          Details
        </Button>
        
        {!isCheckedOut && onCheckout && (
          <Button 
            size="sm" 
            className="w-full bg-library-primary text-white hover:bg-library-primary/90"
            onClick={onCheckout}
          >
            Checkout
          </Button>
        )}
        
        {isCheckedOut && onReturn && (
          <Button 
            size="sm" 
            className="w-full bg-library-accent text-white hover:bg-library-accent/90"
            onClick={onReturn}
          >
            Return
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
