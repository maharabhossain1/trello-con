import { UtilityProvider } from "@/contexts/utilityContext";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <UtilityProvider>
        <body className={inter.className}>
          <div className="w-9/12 m-auto">{children}</div>
        </body>
      </UtilityProvider>
    </html>
  );
}
