import { loadProjects, fileWithFallbackUrl } from "../../api";
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

  const hasImageAsset = project.homePageAssets?.type === "Image";
  const projectImage = hasImageAsset ? project.homePageAssets?.files?.[0] : null;
  const imageUrl = projectImage 
    ? fileWithFallbackUrl(projectImage)
    : "https://stufff.s3.us-east-1.amazonaws.com/rami-og.png";
  const imageWidth = projectImage?.width || 1200;
  const imageHeight = projectImage?.height || 630;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: slug,
      siteName: "Rami George",
      images: [{
        url: imageUrl,
        width: imageWidth,
        height: imageHeight,
        alt: title,
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
