import { loadData, loadProjects } from "../../api";
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
