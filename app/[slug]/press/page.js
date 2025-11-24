import { loadData, loadProjects, fileWithFallbackUrl } from "../../api";
import { processCvDataByYear } from "../../utils";
import PressClient from "./PressClient";
import { defaultMetadata } from "@/config/constants";
import "../../../components/ProjectView/index.scss";

export async function generateMetadata({ params }) {
  const projects = await loadProjects();
  const slug = params.slug;
  const project = projects.find((p) => p?.slug === slug);

  if (!project) {
    return defaultMetadata
  }

  const title = project.title;
  const description = "Press";

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

async function PressPage({ params }) {
  const projects = await loadProjects();
  const slug = params.slug;
  const project = projects.find((p) => p?.slug === slug);
  
  if (!project) {
    return null;
  }

  const cvAdditionalRes = await loadData("/cv-additional.json");
  const cvItems = cvAdditionalRes?.data.rows || [];
  const projectPressIds = project.pressAdditional || [];
  const pressItems = projectPressIds.map((id) =>
    cvItems.find((item) => item.uuid === id)
  );
  const pressByYear = processCvDataByYear(pressItems);

  return <PressClient project={project} pressByYear={pressByYear} />;
}

export default PressPage;
