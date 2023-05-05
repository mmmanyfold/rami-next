import { RichTextCollection } from "../notion";
import "./index.scss";

function CVItem({ title, description, detail, url, isNested }) {
  return (
    <li className={`cv-section ${isNested ? "nested" : ""}`}>
      {url ? (
        <a href={url} target="_blank">
          <span className="title">
            <RichTextCollection objects={title} />
          </span>{" "}
          {description && <RichTextCollection objects={description} />}{" "}
          {detail && (
            <span className="detail">
              <RichTextCollection objects={detail} />
            </span>
          )}
        </a>
      ) : (
        <>
          <span className="title">
            <RichTextCollection objects={title} />
          </span>{" "}
          {description && (
            <span className="description">
              <RichTextCollection objects={description} />
            </span>
          )}{" "}
          {detail && <RichTextCollection objects={detail} />}
        </>
      )}
    </li>
  );
}

function CVSection({ name, items, isNested }) {
  return (
    <section className="cv-section">
      {name && <h1 className={isNested ? "nested" : ""}>{name}</h1>}
      <ul className={isNested ? "nested" : ""}>
        {items.map((item) => (
          <CVItem
            key={item.title}
            title={item.title}
            description={item.description}
            detail={item.detail}
            url={item.url}
            isNested={isNested}
          />
        ))}
      </ul>
    </section>
  );
}

export default CVSection;
