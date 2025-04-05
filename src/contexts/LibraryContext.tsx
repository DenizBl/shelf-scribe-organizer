
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Types
export type BookStatus = 'available' | 'checked-out';

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  publishYear: string;
  category: string;
  status: BookStatus;
  coverImage?: string;
  borrowerId?: string;
  dueDate?: Date;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  memberSince: Date;
  currentBooks: string[]; // Book IDs
}

interface LibraryContextType {
  books: Book[];
  members: Member[];
  addBook: (book: Omit<Book, 'id'>) => void;
  updateBook: (id: string, book: Partial<Book>) => void;
  removeBook: (id: string) => void;
  addMember: (member: Omit<Member, 'id' | 'memberSince' | 'currentBooks'>) => void;
  updateMember: (id: string, member: Partial<Member>) => void;
  removeMember: (id: string) => void;
  checkoutBook: (bookId: string, memberId: string, dueDate: Date) => void;
  returnBook: (bookId: string) => void;
}

// Sample data
const sampleBooks: Book[] = [
  {
    id: '1',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    isbn: '978-0-06-112008-4',
    publishYear: '1960',
    category: 'Fiction',
    status: 'available',
    coverImage: 'https://m.media-amazon.com/images/I/71FxgtFKcQL._AC_UF1000,1000_QL80_.jpg'
  },
  {
    id: '2',
    title: '1984',
    author: 'George Orwell',
    isbn: '978-0-452-28423-4',
    publishYear: '1949',
    category: 'Fiction',
    status: 'checked-out',
    borrowerId: '1',
    dueDate: new Date(2025, 3, 15),
    coverImage: 'https://m.media-amazon.com/images/I/71kxa1-0mfL._AC_UF1000,1000_QL80_.jpg'
  },
  {
    id: '3',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbn: '978-0-7432-7356-5',
    publishYear: '1925',
    category: 'Fiction',
    status: 'available',
    coverImage: 'https://m.media-amazon.com/images/I/71FTb9X6wsL._AC_UF1000,1000_QL80_.jpg'
  },
  {
    id: '4',
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    isbn: '978-0-06-231609-7',
    publishYear: '2011',
    category: 'Non-fiction',
    status: 'available',
    coverImage: 'https://m.media-amazon.com/images/I/41yu2qXhTXL._SY445_SX342_.jpg'
  },
  {
    id: '5',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    isbn: '978-0-261-10295-3',
    publishYear: '1937',
    category: 'Fantasy',
    status: 'checked-out',
    borrowerId: '2',
    dueDate: new Date(2025, 4, 1),
    coverImage: 'https://m.media-amazon.com/images/I/710+HcoP38L._AC_UF1000,1000_QL80_.jpg'
  }
];

const sampleMembers: Member[] = [
  {
    id: '1',
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '555-123-4567',
    memberSince: new Date(2024, 1, 15),
    currentBooks: ['2']
  },
  {
    id: '2',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '555-987-6543',
    memberSince: new Date(2023, 11, 10),
    currentBooks: ['5']
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '555-456-7890',
    memberSince: new Date(2024, 2, 20),
    currentBooks: []
  }
];

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export const LibraryProvider = ({ children }: { children: ReactNode }) => {
  const [books, setBooks] = useState<Book[]>(sampleBooks);
  const [members, setMembers] = useState<Member[]>(sampleMembers);

  // Book operations
  const addBook = (book: Omit<Book, 'id'>) => {
    const newBook = {
      ...book,
      id: Date.now().toString(),
    };
    setBooks((prevBooks) => [...prevBooks, newBook as Book]);
  };

  const updateBook = (id: string, bookUpdate: Partial<Book>) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id ? { ...book, ...bookUpdate } : book
      )
    );
  };

  const removeBook = (id: string) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
  };

  // Member operations
  const addMember = (member: Omit<Member, 'id' | 'memberSince' | 'currentBooks'>) => {
    const newMember = {
      ...member,
      id: Date.now().toString(),
      memberSince: new Date(),
      currentBooks: [],
    };
    setMembers((prevMembers) => [...prevMembers, newMember]);
  };

  const updateMember = (id: string, memberUpdate: Partial<Member>) => {
    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.id === id ? { ...member, ...memberUpdate } : member
      )
    );
  };

  const removeMember = (id: string) => {
    setMembers((prevMembers) => prevMembers.filter((member) => member.id !== id));
  };

  // Checkout and return operations
  const checkoutBook = (bookId: string, memberId: string, dueDate: Date) => {
    // Update the book
    updateBook(bookId, {
      status: 'checked-out',
      borrowerId: memberId,
      dueDate,
    });

    // Update the member
    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.id === memberId
          ? { ...member, currentBooks: [...member.currentBooks, bookId] }
          : member
      )
    );
  };

  const returnBook = (bookId: string) => {
    // Get the book to find borrower
    const book = books.find((b) => b.id === bookId);
    if (!book || book.status !== 'checked-out' || !book.borrowerId) return;

    // Update the book
    updateBook(bookId, {
      status: 'available',
      borrowerId: undefined,
      dueDate: undefined,
    });

    // Update the member
    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.id === book.borrowerId
          ? {
              ...member,
              currentBooks: member.currentBooks.filter((id) => id !== bookId),
            }
          : member
      )
    );
  };

  const value = {
    books,
    members,
    addBook,
    updateBook,
    removeBook,
    addMember,
    updateMember,
    removeMember,
    checkoutBook,
    returnBook,
  };

  return (
    <LibraryContext.Provider value={value}>
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = (): LibraryContextType => {
  const context = useContext(LibraryContext);
  if (context === undefined) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
};
