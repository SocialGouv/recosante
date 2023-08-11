import React, { useState } from "react";
import EpisodePollution from "./dashboard/EpisodePollution";
import Header from "./dashboard/Header";
import Indicators from "./dashboard/Indicators";
import Home from "components/Home";
import { FixedSubscribeButton } from "./dashboard/SubscribeButton";

export default function Dashboard(props) {
  const [date, setDate] = useState();
  return (
    <div className="relative mb-20 sm:mb-40">
      <section className="relative mx-auto my-0 bg-gradient-to-r from-[#d1edff] via-[#f8fafd]  to-[#d6eeff] px-6  pb-28 pt-10 xl:pt-20 ">
        <Header place={props.place} date={date} setDate={setDate} />
        <Indicators place={props.place} date={date} />
        <EpisodePollution place={props.place} date={date} />
      </section>
      <Home />
      <FixedSubscribeButton place={props.place} />
    </div>
  );
}
