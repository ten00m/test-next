import "./globals.css";
import {Header} from "@/src/widgets/header";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{"--vsc-domain":"\"localhost\""}}>
      <body
        className={`antialiased`}
        cz-shortcut-listen="true"
      >
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
