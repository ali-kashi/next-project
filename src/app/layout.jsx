import "./globals.css";
import "../styles/globals.css";
import CartProviderWrapper from "./CartProviderWrapper";
import Header from "./components/Header";
import SessionWrapper from "./SessionWrapper";

export default function RootLayout({ children }) {
  return (
    <html lang="fa">
      <body>
        <SessionWrapper>
          <CartProviderWrapper>
            <Header />
            {children}
          </CartProviderWrapper>
        </SessionWrapper>
      </body>
    </html>
  );
}
