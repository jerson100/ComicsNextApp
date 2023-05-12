import Footer from "components/common/Footer";
import Header from "components/common/Header";
import IdiomaProvider from "contexts/IdiomaContext";
import "styles/globals.css";
import type { AppProps } from "next/app";
import Router from "next/router";
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress

//Route Events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

NProgress.configure({ showSpinner: false });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <IdiomaProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow max-w-xl mx-auto px-4 w-full pt-6">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </IdiomaProvider>
  );
}
