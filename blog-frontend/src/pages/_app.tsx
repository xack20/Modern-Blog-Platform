import client from "@/lib/apollo-client";
import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <DefaultSeo
          openGraph={{
            type: 'website',
            locale: 'en_US',
            url: process.env.NEXT_PUBLIC_SITE_URL,
            siteName: process.env.NEXT_PUBLIC_SITE_NAME,
          }}
          twitter={{
            handle: '@handle',
            site: '@site',
            cardType: 'summary_large_image',
          }}
        />
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
}
