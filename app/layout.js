import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

export const metadata = {
  title: "Vintage & Co. | Luxury Second-Hand Outerwear",
  description: "Curated vintage jackets and coats for the modern wardrobe.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased flex flex-col min-h-screen bg-luxury-bg">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}