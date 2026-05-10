import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "The Code | Krishna108 Teachings",
  description: "Explore the ancient truth of Bhagavad Gita and Srimad Bhagavatam. Pure spiritual transmissions for the modern seeker.",
  openGraph: {
    title: "The Code | Krishna108 Teachings",
    description: "Decoding eternal frequencies from the Vedic scriptures.",
    images: ["/kurukshetra.png"],
  },
};

export default function TeachingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
