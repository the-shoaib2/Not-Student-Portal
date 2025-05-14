"use client"
import type React from "react"
import { useState } from "react"
import { LogOut, User } from "lucide-react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { useAuth } from "@/contexts/AuthContext"
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
import { Button } from "@/components/ui/button"

const UserCard: React.FC = () => {
  const router = useRouter()
  const { user, logout } = useAuth()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const confirmLogout = async () => {
    if (isLoggingOut) return

    try {
      setIsLoggingOut(true)
      await logout()
      toast.success("Logged out successfully")
      router.push("/login")
    } catch (error) {
      console.error("Logout failed:", error)
      toast.error("Failed to log out. Please try again.")

      // Even if there's an error, we should still redirect to login
      // since we've cleared the local auth state
      router.push("/login")
    } finally {
      setIsLoggingOut(false)
      setIsOpen(false)
    }
  }

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsOpen(true)
  }

  return (
    <div className="absolute right-0 top-12 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="p-4">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
            <User className="w-5 h-5 text-teal-600" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900">{user?.name}</h3>
            <p className="text-xs text-gray-500">ID: {user?.userName}</p>
            <p className="text-xs text-gray-500">Role: {user?.commaSeparatedRoles}</p>
          </div>
        </div>

        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogTrigger asChild>
            <Button
              onClick={handleLogout}
              className="w-full flex items-center bg-red-500 hover:bg-red-700 justify-center space-x-2 px-4 py-2 text-sm text-white rounded-lg transition-colors duration-200 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="sm:max-w-[300px]">
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <LogOut className="h-5 w-5 text-red-600" />
                Confirm Logout
              </AlertDialogTitle>
              <AlertDialogDescription>Are you sure you want to log out?</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex gap-2 justify-end">
              <AlertDialogCancel disabled={isLoggingOut}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={(e) => {
                  e.preventDefault()
                  confirmLogout()
                }}
                disabled={isLoggingOut}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {isLoggingOut ? "Logging out..." : "Logout"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}

export default UserCard
