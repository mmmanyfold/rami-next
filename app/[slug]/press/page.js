"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { loadData, loadProjects } from "../../api";
import { processCvDataByYear } from "../../info/page";

import "../../../components/ProjectView/index.scss";
import ProjectAside from "../../../components/ProjectAside";
import CVSection from "../../../components/CVSection";
import NavArrows from "../../../components/NavArrows";

function PressPage() {
  const [project, setProject] = useState(null);
  const [pressByYear, setPressByYear] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  const projectSlug = pathname.split("/")[1];

  useEffect(() => {
    const fetchData = async () => {
      const projects = await loadProjects();
      const cvAdditionalRes = await loadData("cv-additional.json");
      
      const project = projects.find((p) => p?.slug === projectSlug);
      if (project) {
        const cvItems = cvAdditionalRes?.data.rows || [];
        const projectPressIds = project.pressAdditional || [];
        const pressItems = projectPressIds.map((id) =>
          cvItems.find((item) => item.uuid === id)
        );
        setProject(project);
        setPressByYear(processCvDataByYear(pressItems));
      }
    };
    fetchData();
  }, [projectSlug]);

  if (!project) {
    return null;
  }

  return (
    <>
      <div className="page-content">
        <ProjectAside
          project={project}
          view="Press"
        />
        <section className="content">
          {pressByYear.years.map((year) => (
            <CVSection
              key={year}
              name={year}
              items={pressByYear.itemsByKey[year]}
              isNested={true}
            />
          ))}
        </section>
      </div>
      <NavArrows 
        onLeftClick={() => router.push("/" + projectSlug)}
      />
    </>
  );
}

export default PressPage;
