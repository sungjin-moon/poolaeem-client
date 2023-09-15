import type { Metadata } from "next";

interface Props {
  children: React.ReactElement;
}

export const metadata: Metadata = {
  title: "풀내임",
};

function RootLayout({ children }: Props) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}

export default RootLayout;
