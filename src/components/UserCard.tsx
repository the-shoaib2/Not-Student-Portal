"use client"
import { useState, useEffect, useRef } from "react"
import { LogOut, User, BadgeCheck, Bell, IdCard } from "lucide-react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { useAuth } from "@/contexts/AuthContext"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { profileService } from "@/services/proxy-api"

export default function UserCard() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [photograph, setPhotograph] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const hasFetched = useRef(false)
  
  useEffect(() => {
    // Skip if we've already fetched the photo or don't have a username
    if (hasFetched.current || !user?.userName) return;
    
    const fetchPhotograph = async () => {
      try {
        setIsLoading(true)
        const photoData = await profileService.getPhotograph()
        if (photoData?.photoUrl) {
          setPhotograph(photoData.photoUrl)
        }
      } catch (error) {
        console.error('Error loading photograph:', error)
      } finally {
        setIsLoading(false)
      }
    }

    hasFetched.current = true
    fetchPhotograph()
  }, [user?.userName])

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (isLoggingOut) return;

    try {
      setIsLoggingOut(true)
      await logout()
      toast.success("Successfully logged out")
      // Use replace instead of push to prevent going back to the previous page
      router.replace("/login")
    } catch (error) {
      console.error("Logout failed:", error)
      toast.error("Failed to log out. Please try again.")
    } finally {
      setIsLoggingOut(false)
    }
  }

  // Get user initials for fallback
  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="relative p-0 transition-all duration-300 rounded-full flex items-center justify-center cursor-pointer outline-none ring-0 focus:ring-0 focus:ring-offset-0 focus:outline-none">
        <div className="w-8 h-8 rounded-full bg-teal-50/70 dark:bg-teal-900/20 hover:bg-teal-100/50 dark:hover:bg-teal-900/30 transition-colors flex items-center justify-center">
          <User size={20} className="text-teal-600/90 dark:text-teal-400/90" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              {!isLoading && photograph ? (
                <AvatarImage 
                  src={photograph} 
                  alt={user?.name || 'User'} 
                  className="object-cover"
                />
              ) : (
                <AvatarFallback className="bg-teal-100 text-teal-800">
                  {getInitials(user?.name)}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user?.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                ID: {user?.userName}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={() => router.push('/settings')}>
            <BadgeCheck className="mr-2 h-4 w-4" />
            <span>Account</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => router.push('/student-id')}>
            <IdCard  className="mr-2 h-4 w-4" />
            <span>Student ID</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => router.push('/settings/notifications')}>
            <Bell className="mr-2 h-4 w-4" />
            <span>Notifications</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              className="text-red-600 focus:bg-red-50 focus:text-red-600"
              onSelect={(e: Event) => e.preventDefault()}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent className="w-[calc(100%-2rem)] sm:max-w-[300px] mx-auto rounded-lg border-0 shadow-xl p-4">
            <AlertDialogHeader className="space-y-2">
              <AlertDialogTitle className="flex items-center gap-2 text-sm sm:text-base">
                <LogOut className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 flex-shrink-0" />
                <span>Confirm Logout</span>
              </AlertDialogTitle>
              <AlertDialogDescription className="text-xs sm:text-sm text-left">
                Are you sure you want to log out?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex flex-col sm:flex-row gap-2 w-full mt-2 sm:mt-0">
              <AlertDialogCancel 
                disabled={isLoggingOut}
                className="w-full sm:w-auto h-9 px-4 text-sm"
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="w-full sm:w-auto h-9 px-4 text-sm bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {isLoggingOut ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging out...
                  </>
                ) : (
                  'Logout'
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
