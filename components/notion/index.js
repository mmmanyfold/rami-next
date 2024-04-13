import React from "react";
import CaretUpRight from "@/icon/CaretUpRight";
import "./index.scss";

function RichTextObject({ object, color, linkArrow }) {
  let textObject;
  let content;
  let linkUrl;
  let className = "";
  let hasNewlines;

  if (object?.type === "text") {
    textObject = object.text;
    linkUrl = textObject.link?.url;
    content = textObject.content.replace(/(^\n)/gi, "");
    hasNewlines = content.includes("\n");
    const annotations = object.annotations;
    const classes = Object.keys(annotations).filter(
      (k) => annotations[k] === true
    );
    className = classes.join(" ");
  }

  if (!textObject) return null;

  return (
    <>
      {hasNewlines ? (
        <>
          {linkUrl ? (
            <a target="_blank" href={linkUrl}>
              <pre className={className} style={color ? { color } : {}}>
                {content}
              </pre>
              {linkArrow && <CaretUpRight />}
            </a>
          ) : (
            <pre className={className} style={color ? { color } : {}}>
              {content}
            </pre>
          )}
        </>
      ) : (
        <>
          {linkUrl ? (
            <a target="_blank" href={linkUrl}>
              <span className={className} style={color ? { color } : {}}>
                {content}
              </span>{" "}
              {linkArrow && <CaretUpRight />}
            </a>
          ) : (
            <span className={className} style={color ? { color } : {}}>
              {content}
            </span>
          )}
        </>
      )}
    </>
  );
}

const RichTextCollectionItem = ({ object, color, linkArrow }) => {
  switch (object.type) {
    case "text":
      return (
        <RichTextObject
          key={object.id}
          object={object}
          color={color}
          linkArrow={linkArrow}
        />
      );
    case "paragraph":
      return (
        <ParagraphObject
          key={object.id}
          object={object}
          linkArrow={linkArrow}
        />
      );
    case "bulleted_list_item":
      return <BulletedListItem key={object.id} block={object} />;
    case "divider":
      return <hr key={object.id} />;
    default:
      return null;
  }
};

function RichTextCollection({ objects, color, linkArrow }) {
  return (
    <>
      {objects?.map((object, i) => (
        <RichTextCollectionItem
          key={`${object.type}-${i}`}
          object={object}
          color={color}
          linkArrow={linkArrow}
        />
      ))}
    </>
  );
}

const ParagraphObject = ({ object, color, linkArrow }) => {
  let textObjects;
  let className = "";

  if (object.type === "paragraph") {
    const annotations = object.paragraph?.annotations || {};
    const classes = Object.keys(annotations).filter(
      (k) => annotations[k] === true
    );
    className = classes.join(" ");
    textObjects = object.paragraph?.rich_text || [];
  }

  return (
    <>
      {textObjects && (
        <p
          className={className}
          style={
            color
              ? { color: color, padding: 0, margin: "1rem 0" }
              : { padding: 0, margin: "1rem 0" }
          }
        >
          <RichTextCollection objects={textObjects} linkArrow={linkArrow} />
        </p>
      )}
    </>
  );
};

const BulletedListItem = ({ block }) => {
  return (
    <li className="notion-bulleted-list-item">
      <div>
        <RichTextCollection objects={block.bulleted_list_item?.rich_text} />
      </div>
    </li>
  );
};

export { RichTextObject, RichTextCollection, ParagraphObject };
