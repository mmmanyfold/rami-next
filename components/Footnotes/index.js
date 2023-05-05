import "./index.scss";

function Footnotes({ projects }) {
  return (
    <section className="footnotes">
      {projects.map(({ id, title, slug }) => (
        <a href={slug} key={id}>
          <sup className="no-hover">({id})</sup> <span>{title}</span>
        </a>
      ))}
    </section>
  );
}

export default Footnotes;
