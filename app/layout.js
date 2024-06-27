import "./globals.css";

import RootHeader from "@/components/main-header/root-header";

export const metadata = {
  title: "NextLevel Food",
  description: "Delicious meals, shared by a food-loving community.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <RootHeader />

        {children}
      </body>
    </html>
  );
}
