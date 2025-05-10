import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Student Portal',
  description: 'Student Portal - Your academic gateway',
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background">
      {children}
    </div>
  );
}
