import { loadPages } from "../../api";
import PageClient from "./PageClient";
import { defaultMetadata } from "@/config/constants";

export async function generateMetadata({ params }) {
  const pages = await loadPages();
  const slug = params.slug;
  const pageData = pages.find((p) => p.slug === slug);

  if (!pageData) {
    return defaultMetadata
  }

  const { name, project, misc } = pageData;
  console.log({pageData, misc})
  const title = project?.id ? `${project.title} – ${name}` : `${name}`;
  const description = misc
    ? misc[0].plain_text.split("\n")[0]
    : "";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `page/${slug}`,
      siteName: "Rami George",
      images: [{
        url: "https://stufff.s3.us-east-1.amazonaws.com/rami-og.png",
        width: 1200,
        height: 630,
        alt: "Rami George",
      }],
      locale: "en_US",
      type: "website",
    },
  };
}

async function Page({ params }) {
  const pages = await loadPages();
  const slug = params.slug;
  const pageData = pages.find((p) => p.slug === slug);

  return <PageClient pageData={pageData} />;
}

export default Page;
