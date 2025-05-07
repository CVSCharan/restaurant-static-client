import type { Metadata } from "next";
import { MenuProvider } from "@/context/MenuContext";
import "./globals.css";
import { ProductsProvider } from "@/context/ProductsContext";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Restaurant App Template",
  description:
    "Restaurant application full-stack template v1 - Created by CVS CHARAN",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <MenuProvider>
            <ProductsProvider>{children}</ProductsProvider>
          </MenuProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
