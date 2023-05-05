"use client";
import "./page.scss";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ProjectsGrid from "../components/ProjectsGrid";
import Footnotes from "../components/Footnotes";
import { loadProjects } from "./api.js";

function Home() {
  const [projects, setProjects] = useState([]);
  const [innerWidth, setInnerWidth] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const projectsData = await loadProjects();
      setProjects(projectsData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleResize = () => setInnerWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <ul className="gallery">
        {innerWidth < 770 ? (
          <div style={{ padding: "0 1.25rem 0 1.25rem" }}>
            <ProjectsGrid projects={projects} />
          </div>
        ) : (
          projects.map(({ id, title, slug, homePageAssets }) => {
            const { type: assetType, files, align, width } = homePageAssets;
            return (
              <li
                key={id}
                className={`row ${align || ""} ${width ? "w-" + width : ""}`}
              >
                <a href={slug} className="no-hover">
                  <sup className="middle">({id})</sup>
                  {assetType === "Video" ? (
                    <div className="video-container">
                      <div className="loading">loading...</div>
                      <video autoPlay muted loop>
                        <source src={files[0].url} type="video/mp4" />
                      </video>
                    </div>
                  ) : assetType === "Image" && files.length > 1 ? (
                    <>
                      <img
                        className={`hover-image ${width ? "w-" + width : ""}`}
                        src={files[1].url}
                        alt=""
                        loading="lazy"
                      />
                      <img
                        className={width ? "w-" + width : ""}
                        src={files[0].url}
                        alt={title}
                        loading="lazy"
                      />
                    </>
                  ) : assetType === "Image" && files.length === 1 ? (
                    <img
                      className={width ? "w-" + width : ""}
                      src={files[0].url}
                      alt={title}
                      loading="lazy"
                    />
                  ) : null}
                </a>
              </li>
            );
          })
        )}
      </ul>
      <Footnotes projects={projects} />
    </>
  );
}

export default Home;
