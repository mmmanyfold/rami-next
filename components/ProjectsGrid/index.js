import React from "react";
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
              <img src={files[0].url} alt={title} loading="lazy" />
            </>
          ) : assetType === "Image" && files.length === 1 ? (
            <img src={files[0].url} alt={title} loading="lazy" />
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
