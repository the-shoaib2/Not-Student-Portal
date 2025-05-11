'use client';

export default function RegisteredCourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto ">
      <div className="w-full py-2">
        {children}
      </div>
    </main>
  );
}
