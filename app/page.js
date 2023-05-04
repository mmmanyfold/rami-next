"use client";
import "./page.scss";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ProjectsGrid from "../components/ProjectsGrid/index.js";
// import Footnotes from "../lib/Footnotes.svelte";
import { loadProjects } from "./api.js";

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [innerWidth, setInnerWidth] = useState(0);

  useEffect(() => {
    const fetchProjects = async () => {
      const projectsData = await loadProjects(fetch);
      setProjects(projectsData);
      const urls = projectsData.reduce(
        (acc, p) => {
          const assets = p.homePageAssets;
          const files = assets.files || [];
          const fileUrls = files.map((f) => f.url);
          if (assets.type === "Image") {
            return { ...acc, images: [...acc.images, ...fileUrls] };
          } else if (assets.type === "Video") {
            return { ...acc, videos: [...acc.videos, ...fileUrls] };
          } else {
            return acc;
          }
        },
        { images: [], videos: [] }
      );
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    const handleResize = () => setInnerWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
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
  );
}
