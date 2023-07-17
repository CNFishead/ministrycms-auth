import "@/styles/globals.css";
import { ConfigProvider } from "antd";
import { Source_Sans_3 } from "next/font/google";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const inter = Source_Sans_3({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "rgb(60, 98, 85)",
          colorText: "rgb(92, 138, 122)",
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <div className={inter.className}>
          <Component {...pageProps} />
        </div>
      </QueryClientProvider>
    </ConfigProvider>
  );
}
