"use client";
import { Fragment, useState, useEffect, useRef } from "react";
import { RichTextCollection } from "../../components/notion";
import CVSection from "../../components/CVSection";
import SectionToggle from "../../components/SectionToggle";
import SectionDrawer from "../../components/SectionDrawer";
import { loadData } from "../api";
import { processItemsByKey } from "../utils";
import "./page.scss";
import InfoSection from "@/components/InfoSection";

const infoTags = ["Current & Forthcoming"];
const cvTags = [
  "Publishing",
  "Awards & Residencies",
  "Press",
  "Programming",
  "Teaching & Talks",
  "Education",
  "Imprint",
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
  const [innerHeight, setInnerHeight] = useState(0);
  const [bioHeight, setBioHeight] = useState(0);

  const bioRef = useRef(null);

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

  useEffect(() => {
    const handleResize = () => setInnerHeight(window.innerHeight);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (data && bioRef?.current) {
      setBioHeight(bioRef.current.clientHeight);
    }
  }, [data, bioRef]);

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

  return (
    <div className="info">
      {/* column 1 */}
      <div className="column">
        {/* mobile */}
        <div
          className="hide-desktop"
          style={{ height: `${innerHeight - 56.4}px` }}
        >
          <section className="bio" ref={bioRef}>
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

          <div
            className="accordion"
            style={{ paddingTop: `${bioHeight + 10}px` }}
          >
            <SectionDrawer
              name="Current & Forthcoming"
              type="info"
              items={info.itemsByKey["Current & Forthcoming"]}
            />
            <hr />

            <section>
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
            </section>
            <hr />

            {cvAdditional.tags.map((tag, i) => (
              <Fragment key={tag}>
                <SectionDrawer
                  name={tag}
                  type="cv"
                  items={cvAdditional.itemsByKey[tag]}
                />
                {i < cvAdditional.tags.length - 1 && <hr />}
              </Fragment>
            ))}
          </div>
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
              {cvAdditional.tags.map((tag, i) => (
                <Fragment key={tag}>
                  <SectionToggle
                    label={tag}
                    isActive={activeSection === tag}
                    onToggle={() => toggleSection(tag)}
                  />
                  {i < cvAdditional.tags.length - 1 && <hr />}
                </Fragment>
              ))}
            </>
          )}
        </div>
      </div>

      {/* column 2 */}
      <div className="column content">
        {activeSection === "Info" ? (
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
                <>
                  <hr />
                  <InfoSection name={tag} items={info.itemsByKey[tag]} />
                </>
              ))}
          </>
        ) : activeSection === "Exhibitions & Screenings" ? (
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
        ) : activeSection === "Imprint" ? (
          <div style={{ padding: 0 }}>
            <h1>Site Credits</h1>
            <RichTextCollection objects={imprint} />
          </div>
        ) : (
          <CVSection
            name={activeSection}
            items={cvAdditional.itemsByKey[activeSection]}
          />
        )}
      </div>
    </div>
  );
}

export default InfoPage;
