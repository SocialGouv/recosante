import { useLocation } from "@reach/router";
import React, { useEffect, useState } from "react";

import Select from "components/base/FancySelect";
import EpisodePollution from "./header/EpisodePollution";
import MobileSearchModal from "../layout/header/MobileSearchModal";

export default function Header(props) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const dateParam = params.get("date");
  let today = new Date();
  if (dateParam) {
    today = new Date(dateParam);
  }
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const formatDateLabel = (date) => {
    return new Intl.DateTimeFormat("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };
  const formatDateValue = (date) => {
    return new Intl.DateTimeFormat("fr-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(date);
  };
  const todayValue = formatDateValue(today);
  const tomorrowValue = formatDateValue(tomorrow);
  const options = [
    { value: todayValue, label: formatDateLabel(today) },
    { value: tomorrowValue, label: formatDateLabel(tomorrow) },
  ];
  const date = props.date === tomorrowValue ? tomorrowValue : todayValue;
  useEffect(() => {
    dateParam && props.setDate(date);
  }, [dateParam, props, date]);
  const changeDate = (date) => {
    props.setDate(date);
    window?._paq?.push(["trackEvent", "Search", "DateChange"]);
  };
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      <div className="mx-auto flex max-w-6xl flex-col justify-between xl:flex-row">
        <div className="mb-8 flex-1">
          <h1 className="mb-1 text-center xl:flex xl:flex-row xl:flex-wrap xl:items-baseline xl:text-left">
            <span className="order-1 text-main">
              {props.place.nom}
              <button
                aria-label="Modifier la ville"
                onClick={() => {
                  setShowSearch(true);
                }}
                className="-mb-1 ml-2 inline"
              >
                <svg
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.9853 6.38419L10.0425 5.44138L3.83333 11.6505V12.5933H4.77614L10.9853 6.38419ZM11.9281 5.44138L12.8709 4.49857L11.9281 3.55577L10.9853 4.49857L11.9281 5.44138ZM5.32843 13.9267H2.5V11.0983L11.4567 2.14155C11.7171 1.8812 12.1391 1.8812 12.3995 2.14155L14.2851 4.02717C14.5455 4.28752 14.5455 4.70963 14.2851 4.96998L5.32843 13.9267Z"
                    className="fill-main"
                  />
                </svg>
              </button>
            </span>
            <p className="order-2 mb-1 block text-center text-base font-light xl:order-3 xl:shrink-0 xl:basis-full  xl:text-left xl:text-xl">
              {props.place.codesPostaux.length > 2
                ? props.place.codesPostaux[0] +
                  " ... " +
                  props.place.codesPostaux[props.place.codesPostaux.length - 1]
                : props.place.codesPostaux.join(", ")}{" "}
              - {props.place.departement.nom}
            </p>
            <div className="order-3 mx-auto mb-2 mt-1 gap-x-2 text-lg font-light text-text sm:text-xl xl:order-2 xl:inline-flex xl:grow xl:text-[2rem]">
              <span className="hidden xl:inline-block">, le </span>
              <Select
                value={date}
                onChange={(value) => {
                  changeDate((dateParam || value !== todayValue) && value);
                }}
                options={options}
                title="Changer la date"
              />
            </div>
          </h1>
          <div className="my-8 flex flex-row items-center justify-center">
            <button
              type="button"
              className={[
                "inline-flex flex-shrink-0 flex-grow-0 items-center justify-center border-2 border-transparent px-4 py-2 text-base font-medium shadow-sm first-of-type:rounded-l-lg  last-of-type:rounded-r-lg hover:bg-main hover:text-white focus:outline-none focus:ring-2 focus:ring-main focus:ring-offset-2",
                date === todayValue
                  ? "bg-main text-white"
                  : "border-main bg-white text-main ",
              ].join(" ")}
              onClick={() => {
                changeDate(dateParam && todayValue);
              }}
            >
              Aujourd’hui
            </button>
            <button
              type="button"
              className={[
                "inline-flex flex-shrink-0 flex-grow-0 items-center justify-center border-2 border-transparent px-4 py-2 text-base font-medium shadow-sm first-of-type:rounded-l-lg  last-of-type:rounded-r-lg hover:bg-main hover:text-white focus:outline-none focus:ring-2 focus:ring-main focus:ring-offset-2",
                date === tomorrowValue
                  ? "bg-main text-white"
                  : "border-main bg-white text-main",
              ].join(" ")}
              onClick={() => {
                changeDate(tomorrowValue);
              }}
            >
              Demain
            </button>
          </div>
        </div>
        <EpisodePollution place={props.place} date={props.date} />
      </div>
      <MobileSearchModal open={showSearch} setOpen={setShowSearch} />
    </>
  );
}
