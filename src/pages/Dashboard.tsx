
import { useLibrary } from "@/contexts/LibraryContext";
import { StatCard } from "@/components/StatCard";
import { Book, Users, BookOpen, ArrowRightCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { BookCard } from "@/components/BookCard";
import { MemberCard } from "@/components/MemberCard";

const Dashboard = () => {
  const { books, members } = useLibrary();
  const navigate = useNavigate();
  
  // Calculate statistics
  const totalBooks = books.length;
  const availableBooks = books.filter(book => book.status === "available").length;
  const checkedOutBooks = books.filter(book => book.status === "checked-out").length;
  const totalMembers = members.length;
  
  // Get recent books (last 5 added)
  const recentBooks = [...books].slice(-4);
  
  // Get recent members (last 5 added)
  const recentMembers = [...members].slice(-3);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Library Dashboard</h1>
      
      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Books"
          value={totalBooks}
          icon={<Book className="h-5 w-5" />}
          color="bg-library-primary"
        />
        
        <StatCard
          title="Available Books"
          value={availableBooks}
          icon={<BookOpen className="h-5 w-5" />}
          color="bg-green-600"
        />
        
        <StatCard
          title="Checked Out"
          value={checkedOutBooks}
          icon={<BookOpen className="h-5 w-5" />}
          color="bg-amber-600"
        />
        
        <StatCard
          title="Total Members"
          value={totalMembers}
          icon={<Users className="h-5 w-5" />}
          color="bg-blue-600"
        />
      </div>
      
      {/* Recent Books */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Books</CardTitle>
          <Button variant="link" onClick={() => navigate('/books')}>
            View All <ArrowRightCircle className="ml-2 h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {recentBooks.length > 0 ? (
              recentBooks.map(book => (
                <BookCard 
                  key={book.id} 
                  book={book} 
                  onView={() => navigate(`/books/${book.id}`)} 
                />
              ))
            ) : (
              <p className="col-span-full text-center py-10 text-muted-foreground">
                No books in the library yet.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Recent Members */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Members</CardTitle>
          <Button variant="link" onClick={() => navigate('/members')}>
            View All <ArrowRightCircle className="ml-2 h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {recentMembers.length > 0 ? (
              recentMembers.map(member => (
                <MemberCard 
                  key={member.id} 
                  member={member}
                  onView={() => navigate(`/members/${member.id}`)}
                />
              ))
            ) : (
              <p className="col-span-full text-center py-10 text-muted-foreground">
                No members registered yet.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
