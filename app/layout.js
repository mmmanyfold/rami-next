import "../globals.scss";
import LayoutClient from "./LayoutClient";

export const metadata = {
  title: "Rami George",
  description: "Archive of Artwork (2011–Present)",
  openGraph: {
    title: "Rami George",
    description: "Archive of Artwork (2011–Present)",
    url: "ramigeorge.com",
    siteName: "Rami George",
    images: [{
      url: "https://stufff.s3.us-east-1.amazonaws.com/rami-og.png",
      width: 1200,
      height: 630,
      alt: "Rami George",
    }],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.png",
  },
};

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}

export default RootLayout;
