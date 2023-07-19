import React, { useContext, useState } from "react";
import EpisodePollution from "./dashboard/EpisodePollution";
import Header from "./dashboard/Header";
import Indicators from "./dashboard/Indicators";
import ModalContext from "utils/ModalContext";
import { useLocalUser } from "hooks/useUser";

export default function Dashboard(props) {
  const [date, setDate] = useState();
  const { setSubscription } = useContext(ModalContext);
  const { mutateUser } = useLocalUser();
  return (
    <div className="relative mb-20 bg-gradient-to-r from-[#d1edff]  via-[#f8fafd] to-[#d6eeff] pb-28 sm:mb-40">
      <section className="relative mx-auto my-0 px-6 pt-10">
        <Header place={props.place} date={date} setDate={setDate} />
        <Indicators place={props.place} date={date} />
        <EpisodePollution place={props.place} date={date} />
      </section>
      <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center xl:hidden">
        <button
          type="button"
          onClick={() => {
            mutateUser({
              indicateurs: [
                "indice_atmo",
                "indice_pollens",
                "raep",
                "potentiel_radon",
                "indice_uv",
                "vigilance_meteo",
                "baignades",
              ],
              commune: props.place,
            });
            setSubscription("indicators");
            window?._paq?.push(["trackEvent", "Subscription", "FixedButton"]);
          }}
          className="rounded-t-3xl bg-main px-6 pb-1 pt-3 text-white"
        >
          M'abonner aux indicateurs
        </button>
      </div>
    </div>
  );
}
