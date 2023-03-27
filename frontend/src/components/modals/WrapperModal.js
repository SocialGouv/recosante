import React, { useContext } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import FocusTrap from 'focus-trap-react'

import ModalContext from 'utils/ModalContext'
import Modal from 'components/base/Modal'

export default function WrapperModal() {
  const data = useStaticQuery(
    graphql`
      query {
        PM25: mdx(slug: { eq: "polluants/pm25" }) {
          body
          frontmatter {
            title
          }
        }
        PM10: mdx(slug: { eq: "polluants/pm10" }) {
          body
          frontmatter {
            title
          }
        }
        O3: mdx(slug: { eq: "polluants/o3" }) {
          body
          frontmatter {
            title
          }
        }
        NO2: mdx(slug: { eq: "polluants/no2" }) {
          body
          frontmatter {
            title
          }
        }
        SO2: mdx(slug: { eq: "polluants/so2" }) {
          body
          frontmatter {
            title
          }
        }
        indice_atmo: mdx(slug: { eq: "indiceatmo" }) {
          body
          frontmatter {
            title
          }
        }
        ambroisies: mdx(slug: { eq: "pollens/ambroisies" }) {
          body
          frontmatter {
            title
          }
        }
        armoises: mdx(slug: { eq: "pollens/armoises" }) {
          body
          frontmatter {
            title
          }
        }
        aulne: mdx(slug: { eq: "pollens/aulne" }) {
          body
          frontmatter {
            title
          }
        }
        bouleau: mdx(slug: { eq: "pollens/bouleau" }) {
          body
          frontmatter {
            title
          }
        }
        charme: mdx(slug: { eq: "pollens/charme" }) {
          body
          frontmatter {
            title
          }
        }
        chataignier: mdx(slug: { eq: "pollens/chataignier" }) {
          body
          frontmatter {
            title
          }
        }
        chene: mdx(slug: { eq: "pollens/chene" }) {
          body
          frontmatter {
            title
          }
        }
        cypres: mdx(slug: { eq: "pollens/cupressacees" }) {
          body
          frontmatter {
            title
          }
        }
        frene: mdx(slug: { eq: "pollens/frene" }) {
          body
          frontmatter {
            title
          }
        }
        graminees: mdx(slug: { eq: "pollens/graminees" }) {
          body
          frontmatter {
            title
          }
        }
        noisetier: mdx(slug: { eq: "pollens/noisetier" }) {
          body
          frontmatter {
            title
          }
        }
        olivier: mdx(slug: { eq: "pollens/olivier" }) {
          body
          frontmatter {
            title
          }
        }
        peuplier: mdx(slug: { eq: "pollens/peuplier" }) {
          body
          frontmatter {
            title
          }
        }
        plantain: mdx(slug: { eq: "pollens/plantain" }) {
          body
          frontmatter {
            title
          }
        }
        platane: mdx(slug: { eq: "pollens/platane" }) {
          body
          frontmatter {
            title
          }
        }
        rumex: mdx(slug: { eq: "pollens/rumex" }) {
          body
          frontmatter {
            title
          }
        }
        saule: mdx(slug: { eq: "pollens/saule" }) {
          body
          frontmatter {
            title
          }
        }
        tilleul: mdx(slug: { eq: "pollens/tilleul" }) {
          body
          frontmatter {
            title
          }
        }
        urticacees: mdx(slug: { eq: "pollens/urticacees" }) {
          body
          frontmatter {
            title
          }
        }
        raep: mdx(slug: { eq: "raep" }) {
          body
          frontmatter {
            title
          }
        }
        vigilancemeteo: mdx(slug: { eq: "vigilancemeteo" }) {
          body
          frontmatter {
            title
          }
        }
        indice_uv: mdx(slug: { eq: "indiceuv" }) {
          body
          frontmatter {
            title
          }
        }
        baignades: mdx(slug: { eq: "baignades" }) {
          body
          frontmatter {
            title
          }
        }
        potentiel_radon: mdx(slug: { eq: "potentielradon" }) {
          body
          frontmatter {
            title
          }
        }
        sensible: mdx(slug: { eq: "populationvulnerablesensible" }) {
          body
          frontmatter {
            title
          }
        }
        notifications: mdx(slug: { eq: "notifications-modal" }) {
          body
          frontmatter {
            title
          }
        }
        donneesrestreintes: mdx(slug: { eq: "donneesrestreintes" }) {
          body
          frontmatter {
            title
          }
        }
        donneesstatiques: mdx(slug: { eq: "donneesstatiques" }) {
          body
          frontmatter {
            title
          }
        }
      }
    `
  )

  const { modal, setModal } = useContext(ModalContext)

  return (
    <FocusTrap active={!!modal} focusTrapOptions={{allowOutsideClick: true, escapeDeactivates: false}}>
      <Modal open={modal} setOpen={setModal}>
        {modal && data[modal.replaceAll('.', '')] && (
          <>
            <h3
              dangerouslySetInnerHTML={{
                __html: data[modal.replaceAll('.', '')].frontmatter.title,
              }}
            />
            <MDXRenderer>{data[modal.replaceAll('.', '')].body}</MDXRenderer>
          </>
        )}
      </Modal>
    </FocusTrap>
  )
}
