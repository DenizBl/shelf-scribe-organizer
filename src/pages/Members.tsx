
import { useLibrary } from "@/contexts/LibraryContext";
import { MembersList } from "@/components/MembersList";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

const Members = () => {
  const { members } = useLibrary();
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Members</h1>
          <p className="text-muted-foreground">Manage library members</p>
        </div>
        
        <Button 
          onClick={() => navigate("/add-member")}
          className="bg-library-primary hover:bg-library-primary/90"
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Add New Member
        </Button>
      </div>
      
      <MembersList 
        members={members}
        onView={(memberId) => navigate(`/members/${memberId}`)}
      />
    </div>
  );
};

export default Members;
