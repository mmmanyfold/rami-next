"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { loadData, loadProjects } from "../../api";
import ProjectView from "../../../components/ProjectView";
import NavArrows from "../../../components/NavArrows";

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
      const cvItems = cvAdditionalRes?.data.rows || [];
      
      let blocks;
      const project = projects.find((p) => p?.slug === projectSlug);
      
      if (project) {
        const projectPressIds = project.pressAdditional || [];
        blocks = projectPressIds.map((id) =>
          cvItems.find((item) => item.uuid === id)
        );
        setProject(project);
        setBlocks(blocks);
      }
    };
    fetchData();
  }, [projectSlug]);

  if (!project) {
    return null;
  }

  return (
    <>
      <ProjectView project={project} blocks={blocks} view="Press" />
      <NavArrows 
        onLeftClick={() => router.push("/" + projectSlug)}
      />
    </>
  );
}

export default PressPage;
