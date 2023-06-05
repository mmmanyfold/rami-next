"use client";
import { useState, useEffect } from "react";
import ProjectsList from "../../components/ProjectsList";
import { loadProjects } from "../api";

function IndexPage() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const projectsData = await loadProjects();
      setProjects(projectsData);
    };
    fetchData();
  }, []);

  return <ProjectsList projects={projects} />;
}

export default IndexPage;
