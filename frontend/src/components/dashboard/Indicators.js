import React from "react";

import Baignades from "./indicators/Baignades";
import IndiceAtmo from "./indicators/IndiceAtmo";
import IndiceUv from "./indicators/IndiceUv";
import PotentielRadon from "./indicators/PotentielRadon";
import Raep from "./indicators/Raep";
import VigilanceMeteo from "./indicators/VigilanceMeteo";

export default function Indicators(props) {
  return (
    <section className="mx-auto max-w-6xl">
      <div className="flex flex-col gap-y-6 md:hidden">
        <IndiceAtmo place={props.place} date={props.date} />
        <IndiceUv place={props.place} date={props.date} />
        <Raep place={props.place} date={props.date} />
        <Baignades place={props.place} />
        <VigilanceMeteo place={props.place} date={props.date} />
        <PotentielRadon place={props.place} />
      </div>
      <div className="hidden md:flex">
        <div className="flex w-1/2 flex-col gap-y-6 pr-3">
          <IndiceAtmo place={props.place} date={props.date} />
          <IndiceUv place={props.place} date={props.date} />
          <Baignades place={props.place} />
        </div>
        <div className="flex w-1/2 flex-col gap-y-6 pl-3">
          <Raep place={props.place} date={props.date} />
          <VigilanceMeteo place={props.place} date={props.date} />
          <PotentielRadon place={props.place} />
        </div>
      </div>
    </section>
  );
}
