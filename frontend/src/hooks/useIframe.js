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

export default function useIframe() {
  const iframe = useContext(IFrameContext);

  return iframe;
}
