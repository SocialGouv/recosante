import React, { useContext } from "react";

import ModalContext from "utils/ModalContext";

export default function SubscribeButton({ indicator, disabled }) {
  const { setSubscription } = useContext(ModalContext);

  return (
    <div>
      <button
        type="button"
        className="flex w-full items-center justify-center py-2 text-sm font-medium text-main underline transition-colors hover:bg-main/10"
        onClick={() => {
          if (disabled) {
            onClick();
          } else {
            mutateUser({
              indicateurs: [indicator],
              commune: props.place,
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
        M'abonner à cet indicateur
        <svg
          className="ml-2 h-4 w-4"
          viewBox="0 0 17 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.8333 11.333H15.1666V12.6663H1.83325V11.333H3.16659V6.66634C3.16659 3.72082 5.5544 1.33301 8.49992 1.33301C11.4455 1.33301 13.8333 3.72082 13.8333 6.66634V11.333ZM6.49992 13.9997H10.4999V15.333H6.49992V13.9997Z"
            className="fill-main"
          />
        </svg>
      </button>
    </div>
  );
}
