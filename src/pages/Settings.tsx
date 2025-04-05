
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const Settings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your library system settings</p>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Library Information</CardTitle>
            <CardDescription>Update your library's basic information</CardDescription>
          </CardHeader>
          <CardContent>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Library information updated");
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="library-name">Library Name</Label>
                  <Input id="library-name" defaultValue="My Library" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Admin Email</Label>
                  <Input id="admin-email" type="email" defaultValue="admin@library.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="555-123-4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" defaultValue="123 Library St" />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="bg-library-primary hover:bg-library-primary/90"
              >
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Checkout Settings</CardTitle>
            <CardDescription>Configure book checkout policies</CardDescription>
          </CardHeader>
          <CardContent>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Checkout settings updated");
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="loan-period">Default Loan Period (Days)</Label>
                  <Input id="loan-period" type="number" defaultValue="14" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-items">Max Items Per Member</Label>
                  <Input id="max-items" type="number" defaultValue="5" />
                </div>
              </div>
              
              <div className="flex items-center space-x-2 pt-2">
                <Switch id="allow-renewals" defaultChecked />
                <Label htmlFor="allow-renewals">Allow Renewals</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="send-reminders" defaultChecked />
                <Label htmlFor="send-reminders">Send Due Date Reminders</Label>
              </div>
              
              <Button 
                type="submit" 
                className="bg-library-primary hover:bg-library-primary/90"
              >
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>System Preferences</CardTitle>
            <CardDescription>Customize how your library system works</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="dark-mode" />
                <Label htmlFor="dark-mode">Dark Mode</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="show-covers" defaultChecked />
                <Label htmlFor="show-covers">Show Book Covers</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="auto-backup" defaultChecked />
                <Label htmlFor="auto-backup">Automatic Data Backup</Label>
              </div>
              
              <Button 
                onClick={() => toast.success("Settings reset to defaults")}
                variant="outline"
              >
                Reset to Defaults
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
