import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GreenWatts",
  description: "Incentivizing green energy production and usage using blockchain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <ThirdwebProvider activeChain={Sepolia} clientId="68cc3d65b16fd822a5107acb47d4f7d8">
      <html lang="en">
        <body className={manrope.className}>{children}</body>
      </html>
    // </ThirdwebProvider>
  );
}
