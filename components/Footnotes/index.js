function Footnotes({ projects }) {
  return (
    <section>
      {projects.map(({ id, title, slug }) => (
        <a href={slug} key={id}>
          <sup className="no-hover">({id})</sup> <span>{title}</span>
        </a>
      ))}
    </section>
  );
}

export default Footnotes;
