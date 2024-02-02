import "./globals.css";
import Nav from "./auth/Nav";
import { Roboto } from "next/font/google";
import { QueryWrapper } from "./components/QueryWrapper";

// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// const queryClient = new QueryClient();

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: ["--font-roboto"],
});
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`bg-gray-200 mx-4 md:mx-48 lg:mx-96 h-screen ${roboto.variable}`}
      >
        <QueryWrapper>
          <Nav />
          {children}
        </QueryWrapper>
      </body>
    </html>
  );
}
