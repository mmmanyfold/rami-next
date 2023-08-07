"use client";
import { Fragment, useState, useEffect } from "react";
import { RichTextCollection } from "@/components/notion";
import CVSection from "@/components/CVSection";
import InfoSection from "@/components/InfoSection";
import SectionToggle from "@/components/SectionToggle";
import SectionDrawer from "@/components/SectionDrawer";
import { loadData } from "../api";
import { processItemsByKey } from "../utils";
import "./page.scss";

const infoTags = ["Current & Forthcoming"];
const cvTags = [
  "Publishing",
  "Awards & Residencies",
  "Press",
  "Programming",
  "Teaching & Talks",
  "Education"
];

function processInfo(data) {
  const sorted = data.rows.sort((a, b) => (a.id < b.id ? 1 : -1));
  const processed = processItemsByKey(sorted, "tag");
  return { ...processed, tags: infoTags };
}

function processCvAdditional(data) {
  const processed = processItemsByKey(data.rows, "tag");
  return { ...processed, tags: cvTags };
}

function processExhibitionsScreenings(data) {
  const processed = processItemsByKey(data.rows, "year");
  const years = processed.values.sort().reverse();
  return { ...processed, years };
}

function InfoPage() {
  const [data, setData] = useState(null);
  const [activeSection, setActiveSection] = useState("Info");

  useEffect(() => {
    const fetchData = async () => {
      const info = await loadData("info.json");
      const cvAdditional = await loadData("cv-additional.json");
      const imprint = await loadData("imprint.json");
      const exhibitionsScreenings = await loadData(
        "cv-exhibitions-and-screenings.json"
      );
      setData({
        info: info?.data && processInfo(info.data),
        exhibitionsScreenings:
          exhibitionsScreenings?.data &&
          processExhibitionsScreenings(exhibitionsScreenings.data),
        cvAdditional:
          cvAdditional?.data && processCvAdditional(cvAdditional.data),
        imprint: imprint?.data?.blocks,
      });
    };
    fetchData();
  }, []);

  if (!data) {
    return null;
  }

  const toggleSection = (selected) => {
    if (activeSection === selected) {
      setActiveSection("Info");
    } else {
      setActiveSection(selected);
    }
  };

  const { info, exhibitionsScreenings, cvAdditional, imprint } = data;
  const bio = info.itemsByKey.Bio[0]["line-1"];

  let content;
  switch (activeSection) {
    case "Info":
      content = (
        <>
          <section>
            <h1>About</h1>
            <p>
              <RichTextCollection objects={bio} />
            </p>
            <hr />
            <h1>Contact</h1>
            <p>
              <a href="mailto:ramimgeorge@gmail.com">
                rami.m.george (at) gmail.com
              </a>
            </p>
          </section>
          {info &&
            info.tags.map((tag) => (
              <Fragment key={tag}>
                <hr />
                <InfoSection name={tag} items={info.itemsByKey[tag]} />
              </Fragment>
            ))}
        </>
      );
      break;
    case "Exhibitions & Screenings":
      content = (
        <div>
          <h1>Exhibitions & Screenings</h1>
          {exhibitionsScreenings.years.map((year) => (
            <CVSection
              key={year}
              name={year}
              items={exhibitionsScreenings.itemsByKey[year]}
              isNested={true}
            />
          ))}
        </div>
      );
      break;
    case "Imprint":
      content = (
        <div>
          <h1>Site Credits</h1>
          <div className="imprint">
            <RichTextCollection objects={imprint} linkArrow={true} />
          </div>
        </div>
      );
      break;
    default:
      content = (
        <CVSection
          name={activeSection}
          items={cvAdditional.itemsByKey[activeSection]}
        />
      );
  }

  return (
    <div className="info">
      {/* column left */}
      <div className="column">

        {/* mobile */}
        <div className="hide-desktop">
          <section>
            <h1>About</h1>
            <p>
              <RichTextCollection objects={bio} />
            </p>
            <hr />
            <h1>Contact</h1>
            <p>
              <a href="mailto:ramimgeorge@gmail.com">
                rami.m.george (at) gmail.com
              </a>
            </p>
            <hr />
          </section>

          <SectionDrawer
            name="Current & Forthcoming"
            type="info"
            items={info.itemsByKey["Current & Forthcoming"]}
          />
          <hr />

          <SectionToggle
            label="Exhibitions & Screenings"
            isActive={activeSection === "Exhibitions & Screenings"}
            onToggle={() => toggleSection("Exhibitions & Screenings")}
          />
          {activeSection === "Exhibitions & Screenings" && (
            <div>
              {exhibitionsScreenings.years.map((year) => (
                <CVSection
                  key={year}
                  name={year}
                  items={exhibitionsScreenings.itemsByKey[year]}
                  isNested={true}
                />
              ))}
            </div>
          )}
          <hr />

          {cvAdditional.tags.map((tag, i) => (
            <Fragment key={tag}>
              <SectionDrawer
                name={tag}
                type="cv"
                items={cvAdditional.itemsByKey[tag]}
              />
              <hr />
            </Fragment>
          ))}

          <SectionDrawer name="Imprint">
            <div className="imprint">
              <RichTextCollection objects={imprint} linkArrow={true} />
            </div>
          </SectionDrawer>
        </div>

        {/* desktop */}
        <div className="hide-mobile">
          {cvAdditional && (
            <>
              <SectionToggle
                label="Exhibitions & Screenings"
                isActive={activeSection === "Exhibitions & Screenings"}
                onToggle={() => toggleSection("Exhibitions & Screenings")}
              />
              <hr />
              {cvAdditional.tags.map((tag) => (
                <Fragment key={tag}>
                  <SectionToggle
                    label={tag}
                    isActive={activeSection === tag}
                    onToggle={() => toggleSection(tag)}
                  />
                  <hr />
                </Fragment>
              ))}
              <SectionToggle
                label="Imprint"
                isActive={activeSection === "Imprint"}
                onToggle={() => toggleSection("Imprint")}
              />
            </>
          )}
        </div>
      </div>

      {/* column right */}
      <div className="column content">{content}</div>
    </div>
  );
}

export default InfoPage;
