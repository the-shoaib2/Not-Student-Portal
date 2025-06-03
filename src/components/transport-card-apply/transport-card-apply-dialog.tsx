"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "react-hot-toast"
import { transportService } from "@/services/proxy-api"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"


const formSchema = z.object({
  packageId: z.string().min(1, "Please select a package"),
  locationName: z.string().min(1, "Please enter your location"),
  route: z.string().min(1, "Please select a route"),
  semesterType: z.string().min(1, "Please select a semester type"),
  acceptPolicy: z.boolean().refine((val) => val === true, "You must accept the Transport User Policy"),
})

interface Package {
  id: number
  name: string
  amount: string
  startdate: string
  expirydate: string
}

interface TransportCardApplyDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}


// Define available transport routes

const routes = [
  "Dhanmondi <> DSC",
  "Uttara - Rajlokkhi <> DSC",
  "Tongi College gate <> DSC",
  "ECB Chattor <> Mirpur <> DSC",
  "Konabari Pukur Par <> Zirabo <> Ashulia Bazar <> DSC",
  "Baipail <> Nabinagar <> C&B <> DSC",
  "Dhamrai Bus Stand <> Nabinagar <> C&B <> DSC",
  "Savar <> C&B <> DSC",
  "Narayanganj Chasara > Dhanmondi > DSC",
  "Green Model Town <> Mugdha Model Thana <> Malibag <> Rampura <> DSC"
];


export function TransportCardApplyDialog({ open, onOpenChange, onSuccess }: TransportCardApplyDialogProps) {
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      packageId: "",
      locationName: "",
      semesterType: "",
      route: "",
      acceptPolicy: false,
    },
  })

  // Fetch transport packages and user info when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Fetch available transport packages
        const packages = await transportService.getTransportPackages()
        
        if (!packages || !Array.isArray(packages)) {
          toast.error('Failed to load transport packages')
          return
        }
        
        setPackages(packages)
        
        
        // Fetch user transport info to pre-fill the form if available
        try {
          console.log('Fetching user transport info...')
          const userInfo = await transportService.getUserTransportInfo()
          console.log('User transport info:', userInfo)
          if (userInfo) {
            form.setValue('semesterType', userInfo.semesterType || '')
          }
        } catch (error) {
          console.error('Error fetching user transport info:', error)
          // It's okay if this fails, we'll just use empty values
        }
      } catch (error) {
        console.error('Error in fetchData:', error)
        toast.error('Failed to load transport data. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    
    if (open) {
      fetchData()
    }
  }, [open, form])


  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true)
    try {
      const response = await transportService.applyForTransportCard(
        values.locationName,
        parseInt(values.packageId),
        values.semesterType
      )

      if (response.payment_link) {
        toast.success("Application submitted successfully! Redirecting to payment...")
        window.open(response.payment_link, "_blank")
      } else {
        toast.success("Application submitted successfully!")
      }

      onSuccess()
      onOpenChange(false)
      form.reset()
    } catch (error: any) {
      console.error("Error submitting application:", error)
      toast.error(error.message || "Failed to submit application")
    } finally {
      setLoading(false)
    }
  }

  const handlePackageChange = (packageId: string) => {
    const pkg = packages.find((p) => p.id.toString() === packageId)
    setSelectedPackage(pkg || null)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange} >
      <DialogContent className="w-[95vw] max-w-[500px] sm:w-full p-0 overflow-hidden mx-auto rounded-lg sm:rounded-lg">
        <div className="bg-teal-600 p-4 text-white">
          <DialogTitle className="text-xl font-semibold text-center">Transport Card Apply</DialogTitle>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-4 sm:p-6 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-1">
                <label className="block text-sm font-medium text-gray-700">Select Package Name</label>
                <span className="text-red-500">*</span>
              </div>
              {loading ? (
                <div className="space-y-2">
                  <Skeleton className="h-10 w-full rounded-md" />
                </div>
              ) : (
                <FormField
                  control={form.control}
                  name="packageId"
                  render={({ field }) => (
                    <FormItem>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-between text-left font-normal text-sm sm:text-base"
                            disabled={loading}
                          >
                            <span className={!field.value ? 'text-gray-500' : ''}>
                              {field.value
                                ? packages.find((pkg) => pkg.id.toString() === field.value)?.name || 'Select Package'
                                : 'Select Package'}
                            </span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[calc(100vw-2rem)] sm:w-[400px] max-h-60 overflow-y-auto">
                          {packages.map((pkg) => (
                            <DropdownMenuItem
                              key={pkg.id}
                              onSelect={() => {
                                field.onChange(pkg.id.toString());
                                handlePackageChange(pkg.id.toString());
                              }}
                              className="cursor-pointer"
                            >
                              {pkg.name} - {pkg.amount} TK
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-1">
                <label className="block text-sm font-medium text-gray-700">Select Route</label>
                <span className="text-red-500">*</span>
              </div>
              {loading ? (
                <div className="space-y-2">
                  <Skeleton className="h-10 w-full rounded-md" />
                </div>
              ) : (
                <FormField
                  control={form.control}
                  name="route"
                  render={({ field }) => (
                    <FormItem>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-between text-left font-normal text-sm sm:text-base"
                            disabled={loading}
                          >
                            <span className={!field.value ? 'text-gray-500' : ''}>
                              {field.value || 'Select Route'}
                            </span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[calc(100vw-2rem)] sm:w-[400px] max-h-60 overflow-y-auto">
                          {routes.map((route) => (
                            <DropdownMenuItem
                              key={route}
                              onSelect={() => field.onChange(route)}
                              className="cursor-pointer"
                            >
                              {route}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            <div className="space-y-3 p-3 sm:p-4 bg-gray-50 rounded-md">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Start Date</span>
                <span className="text-sm font-medium">{selectedPackage?.startdate || '--'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Expiry Date</span>
                <span className="text-sm font-medium">{selectedPackage?.expirydate || '--'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Amount</span>
                <span className="text-sm font-medium">{selectedPackage ? `${selectedPackage.amount} TK` : '--'}</span>
              </div>
            </div>

            <div className="flex items-start space-x-2 pt-2 text-sm sm:text-base">
              <FormField
                control={form.control}
                name="acceptPolicy"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        className="data-[state=checked]:bg-teal-600 data-[state=checked]:border-teal-600"
                        id="acceptPolicy"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-[12px] font-normal cursor-pointer text-gray-600">
                        I have read, understand, and accept the Transport User Policy and I am taking full responsibility that I will follow the policy{' '}
                        <a 
                          href="https://drive.google.com/file/d/1rtg0p8KirNQbNO-wwrtJF40d_4tuJ3A-/view" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-teal-600 hover:underline"
                        >
                          Link
                        </a>
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            {form.formState.errors.acceptPolicy && (
              <p className="text-sm text-red-600">{form.formState.errors.acceptPolicy.message}</p>
            )}

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="flex-1 bg-white hover:bg-gray-50 text-gray-700 border-gray-300"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white"
              >
                {loading ? 'Applying...' : 'Apply Now'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
