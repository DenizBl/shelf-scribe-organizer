
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Types
export type BookStatus = 'available' | 'checked-out';
export type UserRole = 'member' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
}

export interface Comment {
  id: string;
  bookId: string;
  userId: string;
  userName: string;
  text: string;
  date: Date;
}

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
  intendedFor?: string; // Description of intended audience
  comments: Comment[]; // Comments from users
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
  currentUser: User | null;
  isAuthenticated: boolean;
  addBook: (book: Omit<Book, 'id' | 'comments'>) => void;
  updateBook: (id: string, book: Partial<Book>) => void;
  removeBook: (id: string) => void;
  addMember: (member: Omit<Member, 'id' | 'memberSince' | 'currentBooks'>) => void;
  updateMember: (id: string, member: Partial<Member>) => void;
  removeMember: (id: string) => void;
  checkoutBook: (bookId: string, memberId: string, dueDate: Date) => void;
  returnBook: (bookId: string) => void;
  register: (name: string, email: string, password: string, phone: string, role: UserRole) => void;
  login: (email: string, password: string, role: UserRole) => void;
  logout: () => void;
  addComment: (bookId: string, text: string) => void;
  canEditBooks: () => boolean;
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
    coverImage: 'https://m.media-amazon.com/images/I/71FxgtFKcQL._AC_UF1000,1000_QL80_.jpg',
    intendedFor: 'Young adults and readers interested in themes of racial injustice and moral growth.',
    comments: [
      {
        id: '101',
        bookId: '1',
        userId: '1',
        userName: 'Jane Doe',
        text: 'A powerful story that made me reflect on prejudice and courage.',
        date: new Date(2024, 2, 15)
      }
    ]
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
    coverImage: 'https://m.media-amazon.com/images/I/71kxa1-0mfL._AC_UF1000,1000_QL80_.jpg',
    intendedFor: 'Adults interested in dystopian literature and political commentary.',
    comments: [
      {
        id: '102',
        bookId: '2',
        userId: '2',
        userName: 'John Smith',
        text: 'A chilling warning about totalitarianism that remains relevant today.',
        date: new Date(2024, 1, 20)
      },
      {
        id: '103',
        bookId: '2',
        userId: '3',
        userName: 'Sarah Johnson',
        text: 'The concept of doublethink was particularly thought-provoking.',
        date: new Date(2024, 2, 5)
      }
    ]
  },
  {
    id: '3',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbn: '978-0-7432-7356-5',
    publishYear: '1925',
    category: 'Fiction',
    status: 'available',
    coverImage: 'https://m.media-amazon.com/images/I/71FTb9X6wsL._AC_UF1000,1000_QL80_.jpg',
    intendedFor: 'Readers interested in American literature, the Jazz Age, and themes of wealth and aspiration.',
    comments: []
  },
  {
    id: '4',
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    isbn: '978-0-06-231609-7',
    publishYear: '2011',
    category: 'Non-fiction',
    status: 'available',
    coverImage: 'https://m.media-amazon.com/images/I/41yu2qXhTXL._SY445_SX342_.jpg',
    intendedFor: 'Anyone curious about human history, anthropology, and the development of societies.',
    comments: []
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
    coverImage: 'https://m.media-amazon.com/images/I/710+HcoP38L._AC_UF1000,1000_QL80_.jpg',
    intendedFor: 'Fantasy enthusiasts of all ages who enjoy adventure stories and immersive world-building.',
    comments: [
      {
        id: '104',
        bookId: '5',
        userId: '1',
        userName: 'Jane Doe',
        text: 'A delightful adventure that serves as a perfect introduction to Middle-earth.',
        date: new Date(2023, 11, 10)
      }
    ]
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

// Sample user data for auth simulation
const sampleUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@library.com',
    phone: '555-111-2222',
    role: 'admin'
  },
  {
    id: '2',
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '555-123-4567',
    role: 'member'
  }
];

const USER_STORAGE_KEY = 'library-user';

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export const LibraryProvider = ({ children }: { children: ReactNode }) => {
  const [books, setBooks] = useState<Book[]>(sampleBooks);
  const [members, setMembers] = useState<Member[]>(sampleMembers);
  const [users, setUsers] = useState<User[]>(sampleUsers);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Check for saved user on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    }
  }, []);

  // Book operations
  const addBook = (book: Omit<Book, 'id' | 'comments'>) => {
    const newBook = {
      ...book,
      id: Date.now().toString(),
      comments: []
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

  // Authentication operations
  const register = (name: string, email: string, password: string, phone: string, role: UserRole) => {
    // Check if email already exists
    if (users.some(user => user.email === email)) {
      throw new Error('Email already in use');
    }

    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      role
    };

    // Store user in our mock database
    setUsers(prevUsers => [...prevUsers, newUser]);

    // If it's a member, also add to members list
    if (role === 'member') {
      addMember({
        name,
        email,
        phone
      });
    }

    return true;
  };

  const login = (email: string, password: string, role: UserRole) => {
    // Find user by email and role (in a real app, we'd verify the password)
    const user = users.find(u => u.email === email && u.role === role);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Set as current user
    setCurrentUser(user);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);
  };

  // Comment functionality
  const addComment = (bookId: string, text: string) => {
    if (!currentUser) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      bookId,
      userId: currentUser.id,
      userName: currentUser.name,
      text,
      date: new Date()
    };

    setBooks(prevBooks => 
      prevBooks.map(book => 
        book.id === bookId 
          ? { ...book, comments: [...book.comments, newComment] } 
          : book
      )
    );
  };

  // Permission check
  const canEditBooks = () => {
    return currentUser?.role === 'admin';
  };

  const value = {
    books,
    members,
    currentUser,
    isAuthenticated: !!currentUser,
    addBook,
    updateBook,
    removeBook,
    addMember,
    updateMember,
    removeMember,
    checkoutBook,
    returnBook,
    register,
    login,
    logout,
    addComment,
    canEditBooks
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
