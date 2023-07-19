import React, { useContext } from "react";

import ModalContext from "utils/ModalContext";

export default function Title({ indicateur, isLoading, children }) {
  const { setModal } = useContext(ModalContext);
  return (
    <h2
      className={[
        "w-full bg-main/5 px-2 py-4 text-base font-medium text-main",
        "after:absolute after:left-0 after:top-0 after:h-full after:w-full after:scale-x-0 after:transform after:bg-background after:opacity-70",
        isLoading ? "after:animation-fetching" : "",
      ].join(" ")}
      onClick={() => setModal(indicateur)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.currentTarget.click();
        }
      }}
    >
      {children}
      <sup className="text-xs"> (?)</sup>
    </h2>
  );
}
