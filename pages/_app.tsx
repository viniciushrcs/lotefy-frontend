import "@mantine/core/styles.css";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { theme } from "../theme";
import "./../styles/globals.css";
import { SignUpProvider } from "../context/SignUpContext";
import { EnterpriseProvider } from "../context/EnterpriseContext";

export default function App({ Component, pageProps }: any) {
  return (
    <SignUpProvider>
      <EnterpriseProvider>
        <MantineProvider theme={theme}>
          <Head>
            <title>Lotefy</title>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
            />
            <link rel="icon" href="/favicon.svg" />
          </Head>
          <Component {...pageProps} />
        </MantineProvider>
      </EnterpriseProvider>
    </SignUpProvider>
  );
}
