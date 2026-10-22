import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ConstruAgent",
  description:
    "Asistente para presupuestos de materiales de construcción (prototipo simulado).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
