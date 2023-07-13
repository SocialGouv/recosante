import React from "react";
import useIframe from "hooks/useIframe";

export default function Background({ children }) {
  const iframe = useIframe();

  return (
    <div
      className={[
        "absolute -left-4 -right-4 bottom-0 bg-gradient-to-r from-[#d1edff] via-[#f8fafd] to-[#d6eeff]",
        iframe ? "top-[5.75rem] rounded-[2rem]" : "top-0",
      ].join(" ")}>
      {children}
    </div>
  );
}
