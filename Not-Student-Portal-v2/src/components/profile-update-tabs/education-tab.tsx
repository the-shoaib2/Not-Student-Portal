import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle } from "lucide-react"

export default function EducationTab() {
  return (
    <div className="bg-white p-6 border rounded-md">
      <h2 className="text-center text-lg font-semibold mb-6 border-b pb-2">Educational Information</h2>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Action</TableHead>
              <TableHead>Degree</TableHead>
              <TableHead>Degree Name</TableHead>
              <TableHead>Institute</TableHead>
              <TableHead>University/Board</TableHead>
              <TableHead>Passing Year</TableHead>
              <TableHead>Grade/Class/Division</TableHead>
              <TableHead>Marks/CGPA</TableHead>
              <TableHead>Remarks</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <PlusCircle className="h-4 w-4" />
                </Button>
              </TableCell>
              <TableCell>
                <Select>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Select Degree" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ssc">SSC</SelectItem>
                    <SelectItem value="hsc">HSC</SelectItem>
                    <SelectItem value="bachelor">Bachelor</SelectItem>
                    <SelectItem value="masters">Masters</SelectItem>
                  </SelectContent>
                </Select>
                <div className="text-xs text-red-500">Required</div>
              </TableCell>
              <TableCell>
                <Input placeholder="Degree Name/Major" className="w-[140px]" />
              </TableCell>
              <TableCell>
                <Input placeholder="Name of Institute" className="w-[140px]" />
                <div className="text-xs text-red-500">Required</div>
              </TableCell>
              <TableCell>
                <Input placeholder="University/Board" className="w-[140px]" />
              </TableCell>
              <TableCell>
                <Input defaultValue="2017" className="w-[100px]" />
                <div className="text-xs text-red-500">Required</div>
              </TableCell>
              <TableCell>
                <Input placeholder="Class/Division/Grade" className="w-[140px]" />
              </TableCell>
              <TableCell>
                <Input placeholder="Marks/CGPA" className="w-[100px]" />
              </TableCell>
              <TableCell>
                <Input placeholder="Remarks" className="w-[100px]" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="mt-8 flex justify-center">
        <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8">UPDATE EDUCATION INFO</Button>
      </div>
    </div>
  )
}
