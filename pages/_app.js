/* eslint-disable @next/next/no-sync-scripts */
import "../styles/globals.css";
import Layout from "../components/Layout/Layout";
import Head from "next/head";
import "./css/resources.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* // Responsive meta tag */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* // bootstrap CDN */}
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
          crossOrigin="anonymous"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
          crossOrigin="anonymous"
        ></script>
        <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
      </Head>

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
