
import { useParams, useNavigate } from "react-router-dom";
import { useLibrary } from "@/contexts/LibraryContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookCard } from "@/components/BookCard";
import { format } from "date-fns";
import { ArrowLeft, Pencil, Trash2, Mail, Phone, Calendar } from "lucide-react";
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

const MemberDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { members, books, removeMember, returnBook } = useLibrary();
  const navigate = useNavigate();
  
  const member = members.find(member => member.id === id);
  
  if (!member) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <h2 className="text-2xl font-bold mb-4">Member not found</h2>
        <Button onClick={() => navigate("/members")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Members
        </Button>
      </div>
    );
  }
  
  const memberBooks = books.filter(book => member.currentBooks.includes(book.id));
  
  const handleDeleteMember = () => {
    removeMember(member.id);
    toast.success("Member removed from the library");
    navigate("/members");
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => navigate("/members")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">{member.name}</h1>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{member.email}</span>
              </div>
              
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{member.phone}</span>
              </div>
              
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>Member since: {format(new Date(member.memberSince), 'MMMM d, yyyy')}</span>
              </div>
            </div>
            
            <div className="flex gap-2 mt-4 md:mt-0">
              <Button 
                variant="outline" 
                onClick={() => navigate(`/edit-member/${member.id}`)}
              >
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </Button>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="text-destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Delete Member</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to remove {member.name} from your library? This action cannot be undone.
                      {memberBooks.length > 0 && (
                        <div className="mt-2 font-bold text-destructive">
                          Warning: This member currently has {memberBooks.length} checked out books.
                        </div>
                      )}
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button 
                      variant="destructive" 
                      onClick={handleDeleteMember}
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
      
      <Card>
        <CardHeader>
          <CardTitle>Checked Out Books</CardTitle>
        </CardHeader>
        <CardContent>
          {memberBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {memberBooks.map(book => (
                <BookCard 
                  key={book.id} 
                  book={book} 
                  onReturn={() => {
                    returnBook(book.id);
                    toast.success(`${book.title} has been returned`);
                  }}
                  onView={() => navigate(`/books/${book.id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">This member has no checked out books.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MemberDetails;
