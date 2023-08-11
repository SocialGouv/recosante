import FocusTrap from "focus-trap-react";
import { graphql, useStaticQuery } from "gatsby";
import React, { useContext } from "react";

import Markdown from "components/base/Markdown";
import Modal from "components/base/Modal";
import ModalContext from "utils/ModalContext";

export default function WrapperModal() {
  const data = useStaticQuery(
    graphql`
      query {
        PM25: mdx(fields: { slug: { eq: "polluants/pm25" } }) {
          body
          frontmatter {
            title
          }
        }
        PM10: mdx(fields: { slug: { eq: "polluants/pm10" } }) {
          body
          frontmatter {
            title
          }
        }
        O3: mdx(fields: { slug: { eq: "polluants/o3" } }) {
          body
          frontmatter {
            title
          }
        }
        NO2: mdx(fields: { slug: { eq: "polluants/no2" } }) {
          body
          frontmatter {
            title
          }
        }
        SO2: mdx(fields: { slug: { eq: "polluants/so2" } }) {
          body
          frontmatter {
            title
          }
        }
        indice_atmo: mdx(fields: { slug: { eq: "indiceatmo" } }) {
          body
          frontmatter {
            title
          }
        }
        ambroisies: mdx(fields: { slug: { eq: "pollens/ambroisies" } }) {
          body
          frontmatter {
            title
          }
        }
        armoises: mdx(fields: { slug: { eq: "pollens/armoises" } }) {
          body
          frontmatter {
            title
          }
        }
        aulne: mdx(fields: { slug: { eq: "pollens/aulne" } }) {
          body
          frontmatter {
            title
          }
        }
        bouleau: mdx(fields: { slug: { eq: "pollens/bouleau" } }) {
          body
          frontmatter {
            title
          }
        }
        charme: mdx(fields: { slug: { eq: "pollens/charme" } }) {
          body
          frontmatter {
            title
          }
        }
        chataignier: mdx(fields: { slug: { eq: "pollens/chataignier" } }) {
          body
          frontmatter {
            title
          }
        }
        chene: mdx(fields: { slug: { eq: "pollens/chene" } }) {
          body
          frontmatter {
            title
          }
        }
        cypres: mdx(fields: { slug: { eq: "pollens/cupressacees" } }) {
          body
          frontmatter {
            title
          }
        }
        frene: mdx(fields: { slug: { eq: "pollens/frene" } }) {
          body
          frontmatter {
            title
          }
        }
        graminees: mdx(fields: { slug: { eq: "pollens/graminees" } }) {
          body
          frontmatter {
            title
          }
        }
        noisetier: mdx(fields: { slug: { eq: "pollens/noisetier" } }) {
          body
          frontmatter {
            title
          }
        }
        olivier: mdx(fields: { slug: { eq: "pollens/olivier" } }) {
          body
          frontmatter {
            title
          }
        }
        peuplier: mdx(fields: { slug: { eq: "pollens/peuplier" } }) {
          body
          frontmatter {
            title
          }
        }
        plantain: mdx(fields: { slug: { eq: "pollens/plantain" } }) {
          body
          frontmatter {
            title
          }
        }
        platane: mdx(fields: { slug: { eq: "pollens/platane" } }) {
          body
          frontmatter {
            title
          }
        }
        rumex: mdx(fields: { slug: { eq: "pollens/rumex" } }) {
          body
          frontmatter {
            title
          }
        }
        saule: mdx(fields: { slug: { eq: "pollens/saule" } }) {
          body
          frontmatter {
            title
          }
        }
        tilleul: mdx(fields: { slug: { eq: "pollens/tilleul" } }) {
          body
          frontmatter {
            title
          }
        }
        urticacees: mdx(fields: { slug: { eq: "pollens/urticacees" } }) {
          body
          frontmatter {
            title
          }
        }
        raep: mdx(fields: { slug: { eq: "raep" } }) {
          body
          frontmatter {
            title
          }
        }
        vigilancemeteo: mdx(fields: { slug: { eq: "vigilancemeteo" } }) {
          body
          frontmatter {
            title
          }
        }
        indice_uv: mdx(fields: { slug: { eq: "indiceuv" } }) {
          body
          frontmatter {
            title
          }
        }
        baignades: mdx(fields: { slug: { eq: "baignades" } }) {
          body
          frontmatter {
            title
          }
        }
        potentiel_radon: mdx(fields: { slug: { eq: "potentielradon" } }) {
          body
          frontmatter {
            title
          }
        }
        sensible: mdx(
          fields: { slug: { eq: "populationvulnerablesensible" } }
        ) {
          body
          frontmatter {
            title
          }
        }
        notifications: mdx(fields: { slug: { eq: "notifications-modal" } }) {
          body
          frontmatter {
            title
          }
        }
        donneesrestreintes: mdx(
          fields: { slug: { eq: "donneesrestreintes" } }
        ) {
          body
          frontmatter {
            title
          }
        }
        donneesstatiques: mdx(fields: { slug: { eq: "donneesstatiques" } }) {
          body
          frontmatter {
            title
          }
        }
      }
    `
  );

  const { modal, setModal } = useContext(ModalContext);

  return (
    <FocusTrap
      active={!!modal}
      focusTrapOptions={{ allowOutsideClick: true, escapeDeactivates: false }}
    >
      <Modal open={modal} setOpen={setModal}>
        {modal && data[modal.replaceAll(".", "")] && (
          <>
            <div>
              <h3
                dangerouslySetInnerHTML={{
                  __html: data[modal.replaceAll(".", "")].frontmatter.title,
                }}
                className="inline-block rounded bg-main px-2 py-1 text-left text-base font-medium text-white [&_strong]:text-white"
              />
              <Markdown>{data[modal.replaceAll(".", "")].body}</Markdown>
            </div>
          </>
        )}
      </Modal>
    </FocusTrap>
  );
}
