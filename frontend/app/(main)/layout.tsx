import { RestaurantHeader } from '../../components/RestaurantHeader';
import { Footer } from '../../components/Footer';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <RestaurantHeader />
      {children}
      <Footer />
    </>
  );
} 