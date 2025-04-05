
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLibrary } from '@/contexts/LibraryContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const AddBook = () => {
  const { addBook } = useLibrary();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [category, setCategory] = useState('Fiction');
  const [coverImage, setCoverImage] = useState('');
  const [intendedFor, setIntendedFor] = useState('');

  const categories = [
    "Fiction", "Non-fiction", "Mystery", "Science Fiction", 
    "Fantasy", "Biography", "History", "Poetry", 
    "Self-help", "Reference", "Children's", "Young Adult"
  ];
  
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 125 }, (_, i) => (currentYear - i).toString());
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !author || !isbn) {
      toast("Missing Information", {
        description: "Title, author and ISBN are required fields."
      });
      return;
    }
    
    addBook({
      title,
      author,
      isbn,
      publishYear,
      category,
      coverImage: coverImage || '/placeholder.svg',
      status: "available",
      intendedFor: intendedFor || undefined,
    });
    
    toast("Book Added", {
      description: "The book has been added to your library."
    });
    
    navigate('/books');
  };
  
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-6">Add New Book</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Book Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter book title"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Enter author name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="isbn">ISBN</Label>
                <Input
                  id="isbn"
                  value={isbn}
                  onChange={(e) => setIsbn(e.target.value)}
                  placeholder="e.g., 978-3-16-148410-0"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="year">Publish Year</Label>
                <Select
                  value={publishYear}
                  onValueChange={setPublishYear}
                >
                  <SelectTrigger id="year">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={category}
                  onValueChange={setCategory}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="coverImage">Cover Image URL</Label>
                <Input
                  id="coverImage"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  placeholder="https://example.com/book-cover.jpg"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="intendedFor">Intended Audience</Label>
              <Textarea 
                id="intendedFor"
                value={intendedFor}
                onChange={(e) => setIntendedFor(e.target.value)}
                placeholder="Who is this book intended for?"
                className="min-h-[80px]"
              />
            </div>
            
            <div className="flex justify-end space-x-4">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => navigate('/books')}
              >
                Cancel
              </Button>
              <Button type="submit">Add Book</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddBook;
