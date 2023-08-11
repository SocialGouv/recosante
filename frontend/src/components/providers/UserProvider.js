import React, { useState } from "react";

import UserContext from "utils/UserContext";

export default function UserProvider(props) {
  const [user, setUser] = useState({
    indicateurs_frequence: ["alerte"],
    indicateurs_media: ["mail"],
    recommandations: ["oui"],
    mail: "",
  });

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        mutateUser: (mutation) => setUser({ ...user, ...mutation }),
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
