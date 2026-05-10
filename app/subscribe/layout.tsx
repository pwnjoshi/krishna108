import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Join the Circle | Krishna108 Pulse",
  description: "Subscribe to receive daily Vedic transmissions, sacred wisdom, and updates from the Krishna108 digital sanctuary.",
};

export default function SubscribeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
