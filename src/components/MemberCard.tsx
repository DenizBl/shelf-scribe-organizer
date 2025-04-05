
import { Member } from "@/contexts/LibraryContext";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Mail, Phone } from "lucide-react";
import { format } from "date-fns";

interface MemberCardProps {
  member: Member;
  onView?: () => void;
}

export function MemberCard({ member, onView }: MemberCardProps) {
  const hasBooks = member.currentBooks.length > 0;
  
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <CardContent className="pt-4 flex-1">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-bold text-lg">{member.name}</h3>
          <Badge className={hasBooks ? 'bg-library-primary' : 'bg-library-accent'}>
            {hasBooks ? `${member.currentBooks.length} books` : 'No books'}
          </Badge>
        </div>
        
        <div className="space-y-2 text-sm">
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
            <span>Member since: {format(new Date(member.memberSince), 'MMM d, yyyy')}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0 pb-4">
        <Button 
          onClick={onView}
          className="w-full bg-library-primary text-white hover:bg-library-primary/90"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
