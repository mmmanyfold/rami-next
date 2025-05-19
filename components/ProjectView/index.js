import ProjectAside from "../ProjectAside";
import ProjectContent from "../ProjectContent";
import "./index.scss";

const ProjectView = ({
  project,
  blocks,
  view = "Project",
}) => {
  return (
    <div className="page-content">
      <ProjectAside
        project={project}
        view={view}
      />
      <section className="content">
        <ProjectContent blocks={blocks} />
      </section>
    </div>
  );
};

export default ProjectView;
