import React from "react";
import Web from "components/layout/Web";

export default function stats(props) {
  return (
    <Web title={"Statistiques"}>
      <div className="h-screen">
      <iframe src="https://metabase-recosante.fabrique.social.gouv.fr/public/dashboard/3d03787d-0854-4d81-8892-5f07d8dff835" frameborder="0" width="100%" height="100%" allowtransparency ></iframe>
      </div>
    </Web>
  );
}
