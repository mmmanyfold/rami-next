"use client";
import { useEffect, useState } from "react";
import ProjectView from "../../../components/ProjectView";
import { loadProjects } from "../../api";
import { usePathname } from "next/navigation";

function TranscriptPage() {
  const [project, setProject] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      const projects = await loadProjects();
      setProject(projects.find((p) => p?.slug === pathname.split("/")[1]));
    };
    fetchData();
  }, []);

  return (
    <>
      {project && (
        <>
          <ProjectView
            project={project}
            blocks={project.transcript.blocks}
            view="Transcript"
          />
        </>
      )}
    </>
  );
}

export default TranscriptPage;
