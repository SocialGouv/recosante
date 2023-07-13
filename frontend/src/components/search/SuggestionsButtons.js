import React from "react";
import MagicLink from "components/base/MagicLink";

const suggestions = [
  { name: "Paris", slug: "/place/75056/paris/" },
  { name: "Marseille", slug: "/place/13055/marseille/" },
  { name: "Lyon", slug: "/place/69123/lyon/" },
  { name: "Toulouse", slug: "/place/31555/toulouse/" },
  { name: "Nice", slug: "/place/06088/nice/" },
  { name: "Nantes", slug: "/place/44109/nantes/" },
  { name: "Montpellier", slug: "/place/34172/montpellier/" },
  { name: "Strasbourg", slug: "/place/67482/strasbourg/" },
  // { name: "Bordeaux", slug: "/place/33063/bordeaux/" },
  // { name: "Lille", slug: "/place/59350/lille/" },
  // { name: "Rennes", slug: "/place/35238/rennes/" },
  // { name: "Reims", slug: "/place/51454/reims/" },
  // { name: "Le Havre", slug: "/place/76351/le-havre/" },
];

export default function SuggestionsButtons() {
  return (
    <div className="overflow-hidden xl:pb-40">
      <ul className="m-0 mx-auto flex gap-3 overflow-x-scroll pb-4 sm:max-w-sm sm:flex-wrap sm:justify-center sm:overflow-auto xl:mx-0 xl:max-w-2xl xl:justify-start xl:pb-0 [&_li]:list-none">
        {suggestions.map((suggestion, index) => {
          return (
            <li
              key={suggestion.slug}
              className={[
                "inline-flex w-auto rounded-full border-2 border-main",
                index === 0 ? "ml-6 sm:ml-0" : "",
                index === suggestions.length - 1 ? "mr-6 sm:mr-0" : "",
              ].join(" ")}
            >
              <MagicLink
                className="px-4 py-1 text-xs xl:text-base"
                to={suggestion.slug}
                onClick={() => {
                  window?._paq?.push([
                    "trackEvent",
                    "Search",
                    "PlaceSuggestion",
                    suggestion.name,
                  ]);
                }}
              >
                {suggestion.name}
              </MagicLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
