import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Inquiry | Contact Krishna108",
  description: "Have a question about the teachings or the mission? Get in touch with the Krishna108 collective.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
