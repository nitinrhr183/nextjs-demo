import "../styles/globals.css";
import Layout from "../components/layout/Layout";

//different Page Components will be wrapped by this
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
