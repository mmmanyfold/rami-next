import "../globals.scss";
import LayoutClient from "./LayoutClient";
import { defaultMetadata } from "@/config/constants";

export const metadata = {
  metadataBase: new URL('https://ramigeorge.com'),
  ...defaultMetadata
};

function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.cdnfonts.com" />
        <link rel="dns-prefetch" href="https://fonts.cdnfonts.com" />
        <link href="https://fonts.cdnfonts.com/css/neue-haas-grotesk-display-pro" rel="stylesheet" />
      </head>
      <body>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}

export default RootLayout;
