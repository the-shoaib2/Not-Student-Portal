import type { Student } from "@/services/proxy-api"
import { Skeleton } from "@/components/ui/skeleton"

interface StudentInfoProps {
  student: Student
  loading?: boolean
}

export default function StudentInfo({ student, loading = false }: StudentInfoProps) {
  if (loading) {
    return (
      <div className="space-y-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-32 col-span-1 sm:col-span-2" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        <div className="font-medium text-gray-600">Name</div>
        <div className="col-span-1 sm:col-span-2 break-words">{student.name}</div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        <div className="font-medium text-gray-600">ID</div>
        <div className="col-span-1 sm:col-span-2 break-words">{student.studentId}</div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        <div className="font-medium text-gray-600">Email</div>
        <div className="col-span-1 sm:col-span-2 break-words">{student.email}</div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        <div className="font-medium text-gray-600">Batch</div>
        <div className="col-span-1 sm:col-span-2">{student.batchNo}</div>
      </div>
    </div>
  )
}
