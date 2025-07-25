import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head >
        <meta name="description" content="Nomit Kasera - Frontend Developer" />
        <meta name="title" content="Nomit Kasera | Frontend Developer" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://nomit.me/" />
        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nomit.me/" />
        <meta property="og:title" content="Nomit Kasera | Frontend Developer" />
        <meta property="og:description" content="Turning ideas into interactive web experiences – explore the work and journey of frontend developer Nomit Kasera." />
        <meta property="og:image" content="./thumbnail.png" />

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://nomit.me/" />
        <meta property="twitter:title" content="Nomit Kasera | Frontend Developer" />
        <meta property="twitter:description" content="Turning ideas into interactive web experiences – explore the work and journey of frontend developer Nomit Kasera." />
        <meta property="twitter:image" content="./thumbnail.png" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
