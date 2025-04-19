"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import ProjectView from "../../../components/ProjectView";
import { loadData, loadProjects } from "../../api";
import CaretLeft from "@/icon/CaretLeft";
import MobileArrows from "../../../components/MobileArrows";

function PressPage() {
  const [project, setProject] = useState(null);
  const [blocks, setBlocks] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  const projectSlug = pathname.split("/")[1];

  useEffect(() => {
    const fetchData = async () => {
      const projects = await loadProjects();
      const cvAdditionalRes = await loadData("cv-additional.json");
      const exhibitionsRes = await loadData("cv-additional.json");

      const exhibitions = exhibitionsRes?.data.rows || [];
      const cvAdditional = cvAdditionalRes?.data.rows || [];
      const pressItems = [...exhibitions, ...cvAdditional];

      const currentProject = projects.find((p) => p?.slug === projectSlug);
      let blocks;
      if (currentProject) {
        const pressExhibitions = currentProject.pressExhibitions || [];
        const pressAdditional = currentProject.pressAdditional || [];
        const pressIDs = [...pressExhibitions, ...pressAdditional];
        blocks = pressIDs.map((id) =>
          pressItems.find((item) => item.uuid === id)
        );
      }
      setProject(currentProject);
      setBlocks(blocks);
    };
    fetchData();
  }, []);

  if (!project) {
    return null;
  }

  return (
    <>
      <ProjectView project={project} blocks={blocks} view="Press" />
      <div
        className="desktop arrow left"
        onClick={() => router.push("/" + projectSlug)}
        role="button"
      >
        <CaretLeft />
      </div>
      <MobileArrows 
        onLeftClick={() => router.push("/" + projectSlug)}
      />
    </>
  );
}

export default PressPage;
