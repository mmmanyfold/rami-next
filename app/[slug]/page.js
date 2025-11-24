import { loadProjects, fileWithFallbackUrl } from "../api";
import ProjectClient from "./ProjectClient";
import { defaultMetadata } from "@/config/constants";

export async function generateMetadata({ params }) {
  const projects = await loadProjects();
  const slug = params.slug;
  const project = projects.find((p) => p?.slug === slug);

  if (!project) {
    return defaultMetadata
  }

  const title = project.title;
  const mediumText = project.medium?.map(m => m.plain_text).join('') || '';
  const description = mediumText || "Archive of Artwork (2011–Present)";

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

async function ProjectPage({ params }) {
  const projects = await loadProjects();
  const slug = params.slug;
  const currentIndex = projects.findIndex((p) => p?.slug === slug);
  const project = projects[currentIndex];

  return <ProjectClient project={project} projects={projects} currentIndex={currentIndex} />;
}

export default ProjectPage;
