import DeviceSizeIndicator from "@/components/essential/DeviceSizeIndicator";
import { fontLexendDeca, fontPrata } from "@/components/essential/Fonts";
import config from "@/config/site.config.json";
import NextTopLoader from "nextjs-toploader";
import homepageData from "@/data/pages/_index-3.json";
import "@/styles/styles.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { popularCategories } from "@/libs/functions/categories";
import allPosts from "@/data/posts.json";
export const metadata = {
  title: config.metaData.title,
  description: config.metaData.description,
  url: config.siteURL,
  siteName: config.metaData.title,
  type: "website",

  icons: {
    icon: "/images/favicon.png",
  },

  metadataBase: new URL("https://eyolo-nextjs.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    images: "/images/ogimage.jpg",
  },
};

export default function RootLayout({ children }) {
  const {
    headerCategories,
    banner,
    popularArticles,
    sidebar,
    exploreTopics,
    latestArticles,
  } = homepageData.frontmatter || {};
  const categories = popularCategories(allPosts) || [];
  return (
    <html
      lang="en"
      className={`${fontPrata.variable} ${fontLexendDeca.variable}`}
    >
      <body className="font-secondary">
        <Header hasCategory={headerCategories.enable} categories={categories} />
        {/* <NextTopLoader
          color="#ff4848"
          shadow="none"
          showSpinner={false}
          zIndex={9999999}
          height={2}
        /> */}
        {/* <DeviceSizeIndicator /> */}
        {children}
        <Footer />
      </body>
    </html>
  );
}
