
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLibrary } from '@/contexts/LibraryContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

const AddBook = () => {
  const { addBook } = useLibrary();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [category, setCategory] = useState('Fiction');
  const [coverImage, setCoverImage] = useState('');
  const [description, setDescription] = useState('');

  const categories = [
    "Fiction", "Non-fiction", "Mystery", "Science Fiction", 
    "Fantasy", "Biography", "History", "Self-Help", 
    "Children's", "Reference", "Business", "Science"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!title || !author || !isbn) {
      toast({
        title: "Missing Information",
        description: "Title, author and ISBN are required fields.",
        variant: "destructive"
      });
      return;
    }
    
    // Add book with required fields
    addBook({
      title,
      author,
      isbn,
      publishYear,
      category,
      coverImage: coverImage || '/placeholder.svg',
      description,
      status: "available",
    });
    
    toast({
      title: "Success",
      description: "Book was added to the library."
    });
    
    // Navigate to books list
    navigate('/books');
  };

  return (
    <div className="container mx-auto max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Add New Book</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input 
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Book title"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="author">Author *</Label>
                <Input 
                  id="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Book author"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="isbn">ISBN *</Label>
                <Input 
                  id="isbn"
                  value={isbn}
                  onChange={(e) => setIsbn(e.target.value)}
                  placeholder="ISBN number"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="publishYear">Publish Year</Label>
                <Input 
                  id="publishYear"
                  value={publishYear}
                  onChange={(e) => setPublishYear(e.target.value)}
                  placeholder="Year of publication"
                />
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
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
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
                  placeholder="URL to book cover image"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Book description"
                className="min-h-[100px]"
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
