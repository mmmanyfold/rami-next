import ProjectAside from "../ProjectAside";
import ProjectContent from "../ProjectContent";
import CVSection from "../CVSection";
import "./index.scss";

const ProjectView = ({
  project,
  blocks,
  view = "Project",
  setProject,
  setView,
  setBlocks,
}) => {
  return (
    <div className="page-content">
      <ProjectAside
        project={project}
        view={view}
        setProject={setProject}
        setView={setView}
      />

      <section className="content">
        {view === "Press" ? (
          <CVSection items={blocks} setItems={setBlocks} />
        ) : (
          <ProjectContent blocks={blocks} setBlocks={setBlocks} />
        )}
      </section>
    </div>
  );
};

export default ProjectView;
