import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Manifesto | Krishna108",
  description: "Learn about the mission, origin, and the digital sanctuary of Krishna108. Decoding ancient Vedic truth for the modern age.",
  openGraph: {
    title: "Manifesto | Krishna108",
    description: "The mission to bridge ancient Vedic metaphysics and the digital age.",
    images: ["/manifesto.png"],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
