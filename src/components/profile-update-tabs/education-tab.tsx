import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, Pencil, Trash2, Search, Check, MoreVertical } from "lucide-react"
import { useState, useMemo } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface EducationRecord {
  personId: number;
  degree: string;
  majorSubject: string;
  institute: string;
  universityBoard: string | null;
  passingYear: number;
  result: string | null;
  remarks: string | null;
  cgpa: number;
}

interface EducationTabProps {
  data?: EducationRecord[];
  degree?: any[];
}

export default function EducationTab({ data = [], degree = [] }: EducationTabProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [open, setOpen] = useState(false)
  const [selectedDegree, setSelectedDegree] = useState("")

  const filteredDegrees = useMemo(() => {
    if (!degree) return [];
    return degree.filter(item => 
      item.degree.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [degree, searchTerm]);

  const handleSelect = (value: string) => {
    setSelectedDegree(value);
    setOpen(false);
  };
  // If no data is provided, show a loading state
  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-6 border rounded-md">
        <h2 className="text-center text-lg font-semibold mb-6 border-b pb-2">Educational Information</h2>
        <div className="text-center py-8 text-gray-500">
          No education records found. Add your education information below.
        </div>
      </div>
    )
  }

  return (
    <>
      <Card className="shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
        <CardHeader className="p-2 sm:p-3 bg-gradient-to-r from-teal-50 to-emerald-50 border-b">
          <CardTitle className="text-lg font-semibold text-teal-800">Educational Information</CardTitle>
          <CardDescription className="text-teal-600">View and manage your educational records</CardDescription>
        </CardHeader>
        <CardContent className="p-2 sm:p-3">

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">Degree</TableHead>
                  <TableHead className="text-center">Major</TableHead>
                  <TableHead className="text-center">Institute</TableHead>
                  <TableHead className="text-center">Board/University</TableHead>
                  <TableHead className="text-center">Passing Year</TableHead>
                  <TableHead className="text-center">Result</TableHead>
                  <TableHead className="text-center">CGPA</TableHead>
                  <TableHead className="text-center">Remarks</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((edu, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-center">{edu.degree}</TableCell>
                    <TableCell className="text-center">{edu.majorSubject}</TableCell>
                    <TableCell className="text-center">{edu.institute}</TableCell>
                    <TableCell className="text-center">{edu.universityBoard || '-'}</TableCell>
                    <TableCell className="text-center">{edu.passingYear}</TableCell>
                    <TableCell className="text-center">{edu.result || '-'}</TableCell>
                    <TableCell className="text-center">{edu.cgpa > 0 ? edu.cgpa.toFixed(2) : '-'}</TableCell>
                    <TableCell className="text-center">{edu.remarks || '-'}</TableCell>
                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="cursor-pointer">
                            <Pencil className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer text-red-600 hover:text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Add New Education Card */}
          <div className="mt-8">
            <Card className="shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
              <CardHeader className="p-2 sm:p-3 bg-gradient-to-r from-teal-50 to-emerald-50 border-b">
                <CardTitle className="text-base font-semibold text-teal-800">Add New Education</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="degree">Degree</Label>
                    <div className="relative">
                      <Select open={open} onOpenChange={setOpen} value={selectedDegree}>
                        <SelectTrigger className="w-full justify-between text-left font-normal">
                          <SelectValue placeholder="Select a degree" />
                        </SelectTrigger>
                        <SelectContent className="p-0">
                          <div className="sticky top-0 z-10 bg-background p-2 border-b">
                            <div className="relative">
                              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                placeholder="Search degrees..."
                                className="w-full pl-8"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onClick={(e) => e.stopPropagation()}
                              />
                            </div>
                          </div>
                          <div 
                            className="max-h-[300px] overflow-y-auto"
                            style={{
                              scrollbarWidth: 'thin',
                              scrollbarColor: 'rgba(13, 148, 136, 0.5) transparent'
                            }}
                          >
                            {filteredDegrees.length > 0 ? (
                              filteredDegrees.map((item) => (
                                <div 
                                  key={item.degree}
                                  className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                                  onClick={() => handleSelect(item.degree)}
                                >
                                  <span className="flex-1">{item.degree}</span>
                                  {selectedDegree === item.degree && (
                                    <Check className="ml-2 h-4 w-4 text-primary" />
                                  )}
                                </div>
                              ))
                            ) : (
                              <div className="px-2 py-1.5 text-sm text-muted-foreground">
                                No degrees found
                              </div>
                            )}
                          </div>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="major">Major/Group</Label>
                    <Input id="major" placeholder="e.g., Computer Science" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="institute">Institute Name</Label>
                    <Input id="institute" placeholder="e.g., Daffodil International University" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="board">Board/University</Label>
                    <Input id="board" placeholder="e.g., Dhaka Board" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="year">Passing Year</Label>
                    <Input id="year" type="number" placeholder="e.g., 2025" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="result">Result</Label>
                    <Input id="result" placeholder="e.g., 1st Division" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cgpa">CGPA</Label>
                    <Input id="cgpa" type="number" step="0.01" placeholder="e.g., 3.50" />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="remarks">Remarks</Label>
                    <Input id="remarks" placeholder="Any additional information" />
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <Button variant="outline">Cancel</Button>
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Education
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>

      </Card>

    </>
  )
}



