
import { MemberCard } from "./MemberCard";
import { Member } from "@/contexts/LibraryContext";
import { useState } from "react";
import { SearchBar } from "./SearchBar";

interface MembersListProps {
  members: Member[];
  onView?: (memberId: string) => void;
}

export function MembersList({ members, onView }: MembersListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter members
  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <SearchBar onSearch={setSearchQuery} placeholder="Search members by name or email..." />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredMembers.length > 0 ? (
          filteredMembers.map(member => (
            <MemberCard 
              key={member.id} 
              member={member}
              onView={onView ? () => onView(member.id) : undefined}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-muted-foreground">No members match your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
