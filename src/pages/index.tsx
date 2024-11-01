import Head from "next/head";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import Header from "./components/header/header";
import TableContainer from "./components/table/table";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  return (
    <>
      <Head>
        <title>CSoft Test</title>
        <meta name="description" content="CSoft Test app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div
        className={`${styles.wrapper} ${geistSans.variable} ${geistMono.variable}`}
      >
        <Header />
        <main className={styles.main}>
        <TableContainer/>
        </main>
      </div>
    </>
  );
}
