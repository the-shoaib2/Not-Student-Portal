"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "react-hot-toast"

const formSchema = z.object({
  packageId: z.string().min(1, "Please select a package"),
  locationName: z.string().min(1, "Please select a route"),
  acceptPolicy: z.boolean().refine((val) => val === true, "You must accept the policy"),
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

const routes = [
  "ECB Chattor <> Mirpur <> DSC",
  "Mirpur-1 sony <> DSC",
  "Dhanmondi <> DSC",
  "Uttara <> DSC",
  "Gulshan <> DSC",
]

export function TransportCardApplyDialog({ open, onOpenChange, onSuccess }: TransportCardApplyDialogProps) {
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      packageId: "",
      locationName: "",
      acceptPolicy: false,
    },
  })

  useEffect(() => {
    if (open) {
      fetchPackages()
    }
  }, [open])

  const fetchPackages = async () => {
    try {
      const response = await fetch("http://peoplepulse.diu.edu.bd:8189/bus/package-list")
      const data = await response.json()
      if (data.message === "success") {
        setPackages(data.data)
      }
    } catch (error) {
      console.error("Error fetching packages:", error)
      toast.error("Failed to fetch packages")
    }
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        locationName: values.locationName,
        packageId: values.packageId,
        semesterTypeId: "TRI",
      })

      const response = await fetch(`http://peoplepulse.diu.edu.bd:8189/bus/application-apply?${params}`)
      const data = await response.json()

      if (data.message === "success") {
        toast ("Application submitted successfully! Redirecting to payment...")

        // Redirect to payment
        if (data.payment_link) {
          window.open(data.payment_link, "_blank")
        }

        onSuccess()
        onOpenChange(false)
        form.reset()
      } else {
        toast.error(data.message || "Failed to submit application")
      }
    } catch (error) {
      console.error("Error submitting application:", error)
      toast.error("Failed to submit application")
    } finally {
      setLoading(false)
    }
  }

  const handlePackageChange = (packageId: string) => {
    const pkg = packages.find((p) => p.id.toString() === packageId)
    setSelectedPackage(pkg || null)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="bg-teal-600 text-white p-4 -m-6 mb-6">
          <DialogTitle className="text-center">Transport Card Apply</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="packageId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Package Name: *</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value)
                      handlePackageChange(value)
                    }}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Package Name: *" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {packages.map((pkg) => (
                        <SelectItem key={pkg.id} value={pkg.id.toString()}>
                          {pkg.name} - {pkg.amount} TK
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="locationName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Route: *</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Route: *" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {routes.map((route) => (
                        <SelectItem key={route} value={route}>
                          {route}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedPackage && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Start Date</label>
                  <Input value={selectedPackage.startdate} readOnly />
                </div>

                <div>
                  <label className="text-sm font-medium">Expiry Date</label>
                  <Input value={selectedPackage.expirydate} readOnly />
                </div>

                <div>
                  <label className="text-sm font-medium">Amount</label>
                  <Input value={selectedPackage.amount} readOnly />
                </div>
              </div>
            )}

            <FormField
              control={form.control}
              name="acceptPolicy"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm">
                      * I have read, understand, and accept the Transport User Policy and I am taking full
                      responsibility that I will follow the policy{" "}
                      <a href="#" className="text-blue-600 underline">
                        Link
                      </a>
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600" disabled={loading}>
              {loading ? "APPLYING..." : "APPLY NOW"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
