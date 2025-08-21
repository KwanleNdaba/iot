"use client";
import { FC, useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from  "@/components/ui/card";;
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import {
  Camera,
  Mail,
  User,
  Upload,
  Trash2,
  Edit,
  Save,
  X,
} from "lucide-react";
import Loader from "@/components/ui/loader";

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  emailAddress: z.string().email("Please enter a valid email address"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

// Mock user data
const mockUserData = {
  firstName: "John",
  lastName: "Doe",
  emailAddress: "john.doe@techcorp.com",
  profilePicture: "https://github.com/shadcn.png", // Set to null to test without profile picture
  inviteCount: 2,
};

const ProfileComponent: FC = () => {
  // Mock user store state
  const [firstName, setFirstName] = useState(mockUserData.firstName);
  const [lastName, setLastName] = useState(mockUserData.lastName);
  const [emailAddress, setEmailAddress] = useState(mockUserData.emailAddress);
  const [profilePicture, setProfilePicture] = useState<any>(mockUserData.profilePicture);
  const [inviteCount] = useState(mockUserData.inviteCount);
  const [isLoading] = useState(false); // Set to true to test loading state

  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUploadingPicture, setIsUploadingPicture] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName,
      lastName,
      emailAddress,
    },
  });

  const userInitials =
    `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  const fullName = `${firstName} ${lastName}`;

  // Mock functions
  const getProfilePictureUrl = () => {
    return profilePicture;
  };

  const updateProfile = async (data: ProfileFormData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Update local state
    setFirstName(data.firstName);
    setLastName(data.lastName);
    setEmailAddress(data.emailAddress);
    
    console.log("Profile updated:", data);
  };

  const updateProfilePicture = async (base64Data: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real app, you'd upload to your server and get back a URL
    // For demo, we'll use a placeholder URL
    const mockUrl = `data:image/jpeg;base64,${base64Data}`;
    setProfilePicture(mockUrl);
    
    console.log("Profile picture updated");
  };

  const removeProfilePicture = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setProfilePicture(null);
    console.log("Profile picture removed");
  };

  // Update form when user data changes
  useEffect(() => {
    form.reset({
      firstName,
      lastName,
      emailAddress,
    });
  }, [firstName, lastName, emailAddress, form]);

  const handleProfileUpdate = async (data: ProfileFormData) => {
    setIsUpdating(true);
    try {
      await updateProfile(data);
      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
      console.error("Profile update error:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    // Convert to base64
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64 = e.target?.result as string;
      // Remove the data:image/...;base64, prefix
      const base64Data = base64.split(",")[1];

      setIsUploadingPicture(true);
      try {
        await updateProfilePicture(base64Data);
        toast.success("Profile picture updated successfully");
      } catch (error) {
        toast.error("Failed to update profile picture");
        console.error("Profile picture update error:", error);
      } finally {
        setIsUploadingPicture(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveProfilePicture = async () => {
    setIsUploadingPicture(true);
    try {
      await removeProfilePicture();
      toast.success("Profile picture removed successfully");
    } catch (error) {
      toast.error("Failed to remove profile picture");
      console.error("Profile picture removal error:", error);
    } finally {
      setIsUploadingPicture(false);
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    form.reset({
      firstName,
      lastName,
      emailAddress,
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader text="Loading profile..." />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Picture Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Profile Picture
            </CardTitle>
            <CardDescription>
              Upload a profile picture to personalize your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={getProfilePictureUrl()} alt={fullName} />
                  <AvatarFallback className="text-lg">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                {isUploadingPicture && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
                    <Loader text="Uploading..." size="sm" />
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploadingPicture}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>

                {profilePicture && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRemoveProfilePicture}
                    disabled={isUploadingPicture}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />

              <p className="text-xs text-muted-foreground text-center">
                Supported formats: JPG, PNG, GIF
                <br />
                Maximum size: 5MB
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Profile Information Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
                <CardDescription>
                  Update your personal details and contact information
                </CardDescription>
              </div>

              {!isEditing ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={cancelEdit}
                    disabled={isUpdating}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={form.handleSubmit(handleProfileUpdate)}
                    disabled={isUpdating}
                  >
                    {isUpdating ? (
                      <Loader text="Saving..." size="sm" />
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {!isEditing ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      First Name
                    </Label>
                    <p className="text-sm font-medium">{firstName}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Last Name
                    </Label>
                    <p className="text-sm font-medium">{lastName}</p>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Email Address
                  </Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm font-medium">{emailAddress}</p>
                  </div>
                </div>
              </div>
            ) : (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleProfileUpdate)}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter first name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter last name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="emailAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter email address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Account Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Account Overview</CardTitle>
          <CardDescription>
            Quick overview of your account status and activity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Pending Invites
                </p>
                <p className="text-2xl font-bold">{inviteCount}</p>
              </div>
              <Badge variant={inviteCount > 0 ? "default" : "secondary"}>
                {inviteCount > 0 ? "Active" : "None"}
              </Badge>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Account Status
                </p>
                <p className="text-2xl font-bold">Active</p>
              </div>
              <Badge variant="default" className="bg-green-100 text-green-800">
                Verified
              </Badge>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Profile Picture
                </p>
                <p className="text-2xl font-bold">
                  {profilePicture ? "Set" : "None"}
                </p>
              </div>
              <Badge variant={profilePicture ? "default" : "secondary"}>
                {profilePicture ? "Uploaded" : "Default"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileComponent;