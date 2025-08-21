import { useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import NotificationList from "./NotificationList";

const NotificationBell = () => {
  // Mock notification count - you can adjust this value
  const [totalNotificationCount] = useState(3);

  const handleBellClick = async () => {
    // In a real app, this would refresh data from the backend
    // For now, we'll just simulate the click action
    console.log("Notification bell clicked - refreshing data...");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          onClick={handleBellClick}
        >
          <Bell className="h-4 w-4" />
          {totalNotificationCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
              {totalNotificationCount > 9 ? "9+" : totalNotificationCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <NotificationList />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationBell;