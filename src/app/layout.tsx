import type { Metadata } from "next";
import { MenuProvider } from "@/context/MenuContext";
import "./globals.css";
import { ProductsProvider } from "@/context/ProductsContext";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Restaurant Application",
  description: "Restaurant application v1 - Created by CVS CHARAN",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <MenuProvider>
          <ProductsProvider>
            <body>{children}</body>
          </ProductsProvider>
        </MenuProvider>
      </AuthProvider>
    </html>
  );
}
