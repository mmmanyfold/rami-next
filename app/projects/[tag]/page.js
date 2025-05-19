"use client";
import { useState, useEffect } from "react";
import ProjectsList from "../../../components/ProjectsList";
import { loadProjects } from "../../api";
import { usePathname } from "next/navigation";

function TagPage() {
  const [projects, setProjects] = useState([]);
  const pathname = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      const projectsData = await loadProjects();
      const tag = pathname.split("/")[2];
      const isYear = /^\d{4}$/.test(tag);

      let filtered;
      if (isYear) {
        filtered = projectsData.filter((p) => p.year === tag);
      } else {
        filtered = projectsData.filter((p) => p.tags.includes(tag));
      }
      setProjects(filtered);
    };
    fetchData();
  }, [pathname]);

  return <ProjectsList projects={projects} />;
}

export default TagPage;
