import React from "react";
import NextImage from "next/image";
import { assetBaseUrl } from "@/app/api";
import "./index.scss";

function Project({ title, slug, tags, year, homePageAssets }) {
  const { type: assetType, files } = homePageAssets;
  return (
    <div className="item">
      <div className="asset">
        <a href={"/" + slug}>
          {assetType === "Video" ? (
            <div className="video-container">
              <div className="loading">loading...</div>
              <video autoPlay muted loop playsInline>
                <source src={files[0].url} type="video/mp4" />
              </video>
            </div>
          ) : assetType === "Image" && files.length > 1 ? (
            <>
              <img
                className="hover-image"
                src={files[1].url}
                alt=""
                loading="lazy"
              />
              <NextImage 
                src={`${assetBaseUrl}/${files[0].name}`}
                alt={title}
                width={files[0].width}
                height={files[0].height}
              />
            </>
          ) : assetType === "Image" && files.length === 1 ? (
            <NextImage 
              src={`${assetBaseUrl}/${files[0].name}`}
              alt={title}
              width={files[0].width}
              height={files[0].height}
            />
          ) : null}
        </a>
      </div>

      <div className="caption">
        <a href={"/" + slug} className="title">
          {title}
        </a>
        <div className="tags">
          {tags.map((tag) => (
            <span key={tag}>
              <a href={"/projects/" + tag}>{tag}</a>,{" "}
            </span>
          ))}
          <a href={"/projects/" + year}>{year}</a>
        </div>
      </div>
    </div>
  );
}

function ProjectsGrid({ projects }) {
  return (
    <div className="grid">
      {projects.map((project) => (
        <Project key={project.id} {...project} />
      ))}
    </div>
  );
}

export default ProjectsGrid;
