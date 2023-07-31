import React from "react";

import Baignades from "./indicators/Baignades";
import IndiceAtmo from "./indicators/IndiceAtmo";
import IndiceUv from "./indicators/IndiceUv";
import PotentielRadon from "./indicators/PotentielRadon";
import Raep from "./indicators/Raep";
import VigilanceMeteo from "./indicators/VigilanceMeteo";

export default function Indicators(props) {
  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-y-6">
      <div className="flex flex-col flex-wrap gap-y-6 md:flex-row [&>*]:w-full [&>*]:md:basis-1/2">
        <div className="flex flex-col gap-y-6">
          <IndiceAtmo place={props.place} date={props.date} />
          <IndiceUv place={props.place} date={props.date} />
        </div>
        <Raep place={props.place} date={props.date} />
      </div>
      <div className="flex flex-col flex-wrap gap-y-6 md:flex-row [&>*]:w-full [&>*]:md:basis-1/2">
        <Baignades place={props.place} />
        <div className="flex flex-col gap-y-6">
          <VigilanceMeteo place={props.place} date={props.date} />
          <PotentielRadon place={props.place} />
        </div>
      </div>
    </section>
  );
}
