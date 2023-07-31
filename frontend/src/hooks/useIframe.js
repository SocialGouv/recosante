import React, { useEffect, useState, useContext } from "react";

const IFrameContext = React.createContext({});

export function IFrameProvider(props) {
  const [iframe, setIframe] = useState(false);
  useEffect(() => {
    setIframe(window.location.search.includes("iframe"));
  }, []);
  return (
    <IFrameContext.Provider value={iframe}>
      {props.children}
    </IFrameContext.Provider>
  );
}

export default function useIframe(debug = false) {
  const iframe = useContext(IFrameContext);

  if (debug) console.log("iframe", iframe);

  return iframe;
}
