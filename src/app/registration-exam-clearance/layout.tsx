'use client';

export default function RegisteredCourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto ">
      <div className="w-full py-16">
        {children}
      </div>
    </main>
  );
}
