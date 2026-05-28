import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Leafity | AI Plant Disease Detection",
  description: "Deteksi penyakit tanaman secara instan menggunakan kecerdasan buatan (AI). Dapatkan panduan perawatan gratis untuk menjaga tanaman tetap sehat.",
  keywords: [
    "plant disease", 
    "deteksi penyakit tanaman", 
    "AI agriculture", 
    "plant care", 
    "pertanian", 
    "tumbuhan", 
    "leafity", 
    "plant health", 
    "panduan perawatan tanaman"
  ],
  authors: [{ name: "Leafity Team" }],
  creator: "Leafity",
  publisher: "Leafity",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Leafity | AI Plant Disease Detection",
    description: "Deteksi penyakit tanaman secara instan menggunakan kecerdasan buatan (AI). Dapatkan panduan perawatan gratis.",
    url: "https://leafity.com",
    siteName: "Leafity",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Leafity Logo",
      }
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Leafity | AI Plant Disease Detection",
    description: "Deteksi penyakit tanaman instan berbasis AI. Unggah foto daun dan dapatkan perawatannya.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${poppins.variable} font-sans h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
