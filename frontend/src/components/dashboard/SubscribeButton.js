import React, { useContext } from "react";

import ModalContext from "utils/ModalContext";
import { useLocalUser } from "hooks/useUser";

export default function SubscribeButton({
  indicator,
  disabled,
  onClick,
  place,
}) {
  const { setSubscription } = useContext(ModalContext);
  const { mutateUser } = useLocalUser();

  return (
    <div>
      <button
        type="button"
        className={[
          "hidden w-full items-center justify-center py-2 text-sm font-medium underline transition-colors md:flex",
          disabled ? "text-neutral-700" : "text-main hover:bg-main/10",
        ].join(" ")}
        onClick={() => {
          if (disabled) {
            onClick();
          } else {
            mutateUser({
              indicateurs: [indicator],
              commune: place,
            });
            setSubscription("indicators");
          }
          window?._paq?.push([
            "trackEvent",
            "Subscription",
            "Indicateur",
            indicator,
          ]);
        }}
      >
        {disabled
          ? "Pas d'abonnement disponible"
          : "M'abonner à cet indicateur"}
        <svg
          className="ml-2 h-4 w-4"
          viewBox="0 0 17 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {disabled ? (
            <path
              d="M12.8913 13.3331H3.16742C2.98333 13.3331 2.83409 13.1839 2.83409 12.9998C2.83409 12.9277 2.85748 12.8575 2.90075 12.7998L3.16742 12.4442V6.66648C3.16742 5.7799 3.38373 4.94388 3.76645 4.20828L1.42969 1.87152L2.37249 0.928711L15.5718 14.128L14.629 15.0709L12.8913 13.3331ZM13.8341 10.5237L5.54011 2.22967C6.38711 1.66334 7.4054 1.33312 8.50073 1.33312C11.4463 1.33312 13.8341 3.72093 13.8341 6.66648V10.5237ZM6.83409 13.9998H10.1674C10.1674 14.9203 9.4212 15.6665 8.50073 15.6665C7.58027 15.6665 6.83409 14.9203 6.83409 13.9998Z"
              fill="#383838"
            />
          ) : (
            <path
              d="M13.8333 11.333H15.1666V12.6663H1.83325V11.333H3.16659V6.66634C3.16659 3.72082 5.5544 1.33301 8.49992 1.33301C11.4455 1.33301 13.8333 3.72082 13.8333 6.66634V11.333ZM6.49992 13.9997H10.4999V15.333H6.49992V13.9997Z"
              className="fill-main"
            />
          )}
        </svg>
      </button>
    </div>
  );
}

export function FixedSubscribeButton({ place }) {
  const { setSubscription } = useContext(ModalContext);
  const { mutateUser } = useLocalUser();
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center md:hidden">
      <button
        type="button"
        onClick={() => {
          mutateUser({
            indicateurs: [
              "indice_atmo",
              "raep",
              // "potentiel_radon",
              "indice_uv",
              "vigilance_meteo",
              // "baignades",
            ],
            commune: place,
          });
          setSubscription("indicators");
          window?._paq?.push(["trackEvent", "Subscription", "FixedButton"]);
        }}
        className="rounded-t-3xl bg-main px-6 pb-1 pt-3 text-white"
      >
        M'abonner aux indicateurs
      </button>
    </div>
  );
}
