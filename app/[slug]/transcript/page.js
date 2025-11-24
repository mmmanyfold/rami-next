import { loadProjects } from "../../api";
import TranscriptClient from "./TranscriptClient";
import { defaultMetadata } from "@/config/constants";
import "../../../components/ProjectView/index.scss";

export async function generateMetadata({ params }) {
  const projects = await loadProjects();
  const slug = params.slug;
  const project = projects.find((p) => p?.slug === slug);

  if (!project) {
    return defaultMetadata;
  }

  const title = project.title;
  const description = "Video transcript";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: slug,
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

async function TranscriptPage({ params }) {
  const projects = await loadProjects();
  const slug = params.slug;
  const project = projects.find((p) => p?.slug === slug);
  
  if (!project) {
    return null;
  }

  return <TranscriptClient project={project} />;
}

export default TranscriptPage;
