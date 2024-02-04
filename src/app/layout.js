import { Poppins, Almendra } from "next/font/google";
import "./globals.css";
import { CharacterProvider } from "./context/CharacterProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--poppins",
});
const almenra = Almendra({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--almendra",
});

export const metadata = {
  title: "DnD Next",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <CharacterProvider>
        <body
          className={`${poppins.variable} ${almenra.variable} font-poppins`}
        >
          {children}
        </body>
      </CharacterProvider>
    </html>
  );
}
