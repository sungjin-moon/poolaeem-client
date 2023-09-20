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
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>{children}</body>
    </html>
  );
}

export default RootLayout;
