import CaretUpRight from "@/icon/CaretUpRight";
import { RichTextCollection } from "../notion";
import "./index.scss";

const ListItem = ({ item }) => {
  return (
    <li>
      {item["url"] || item["download"] ? (
        <a href={item["url"] || item["download"][0]["url"]}>
          {item["line-1"] && (
            <span className="title">
              <RichTextCollection objects={item["line-1"]} />
              <br />
            </span>
          )}
          {item["line-2"] && (
            <>
              <RichTextCollection objects={item["line-2"]} />
              <br />
            </>
          )}
          {item["line-3"] && (
            <>
              <RichTextCollection objects={item["line-3"]} />
              {!item["line-4"] && (
                <>
                  {" "}
                  <CaretUpRight />
                </>
              )}
              <br />
            </>
          )}
          {item["line-4"] && (
            <>
              <RichTextCollection objects={item["line-4"]} /> <CaretUpRight />
            </>
          )}
        </a>
      ) : (
        <>
          {item["line-1"] && (
            <span className="title">
              <RichTextCollection objects={item["line-1"]} />
              <br />
            </span>
          )}
          {item["line-2"] && (
            <>
              <RichTextCollection objects={item["line-2"]} />
              <br />
            </>
          )}
          {item["line-3"] && (
            <>
              <RichTextCollection objects={item["line-3"]} />
              <br />
            </>
          )}
          {item["line-4"] && <RichTextCollection objects={item["line-4"]} />}
        </>
      )}
    </li>
  );
};

const InfoSection = ({ name, items }) => {
  return (
    <section className="info-section">
      {name && <h1>{name}</h1>}
      <ul>
        {items.map((item, index) => (
          <ListItem key={index} item={item} />
        ))}
      </ul>
    </section>
  );
};

export default InfoSection;
