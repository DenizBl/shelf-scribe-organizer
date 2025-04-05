
import { useLibrary } from "@/contexts/LibraryContext";
import { StatCard } from "@/components/StatCard";
import { Book, BookOpen, Users, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookList } from "@/components/BookList";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { books, members } = useLibrary();
  const navigate = useNavigate();
  
  // Calculate stats
  const totalBooks = books.length;
  const availableBooks = books.filter(book => book.status === 'available').length;
  const checkedOutBooks = books.filter(book => book.status === 'checked-out').length;
  const totalMembers = members.length;
  
  // Get due soon books (due within next 7 days)
  const currentDate = new Date();
  const sevenDaysLater = new Date(currentDate);
  sevenDaysLater.setDate(currentDate.getDate() + 7);
  
  const dueSoonBooks = books.filter(book => 
    book.status === 'checked-out' && 
    book.dueDate && 
    new Date(book.dueDate) <= sevenDaysLater &&
    new Date(book.dueDate) >= currentDate
  );
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your library system</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Books" 
          value={totalBooks} 
          icon={<Book className="h-6 w-6" />} 
        />
        <StatCard 
          title="Available Books" 
          value={availableBooks} 
          icon={<BookOpen className="h-6 w-6" />} 
          color="bg-library-accent"
        />
        <StatCard 
          title="Checked Out" 
          value={checkedOutBooks} 
          icon={<Calendar className="h-6 w-6" />} 
          color="bg-amber-600"
        />
        <StatCard 
          title="Total Members" 
          value={totalMembers} 
          icon={<Users className="h-6 w-6" />} 
          color="bg-blue-600"
        />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Books Due Soon</CardTitle>
          <CardDescription>Books due within the next 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          {dueSoonBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {dueSoonBooks.map(book => (
                <BookCard 
                  key={book.id} 
                  book={book} 
                  onReturn={() => {}}
                  onView={() => navigate(`/books/${book.id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No books due soon.</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Recently Added Books</CardTitle>
          <CardDescription>The latest additions to your library</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {books.slice(0, 5).map(book => (
              <BookCard 
                key={book.id} 
                book={book} 
                onCheckout={() => {}}
                onReturn={() => {}}
                onView={() => navigate(`/books/${book.id}`)}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
