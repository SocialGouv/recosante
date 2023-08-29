import useUrlB64ToUint8Array from "hooks/useUrlB64ToUint8Array";
import { useState } from "react";

export default function useNotificationsPrompt(sw, applicationServerKey) {
  const [error, setError] = useState(false);
  const [prompting, setPrompting] = useState(false);

  const applicationServerKeyAsUint8Array =
    useUrlB64ToUint8Array(applicationServerKey);

  const subscribe = async () => {
    setPrompting(true);
    try {
      const registration = await navigator.serviceWorker.register(sw);
      const pushSubscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKeyAsUint8Array,
      });
      setPrompting(false);
      setError(false);
      return pushSubscription;
    } catch (error) {
      setPrompting(false);
      console.log(error);
      setError(error.message);
    }
  };

  const clear = () => {
    setError(false);
    setPrompting(false);
  };

  return { error, prompting, subscribe, clear };
}
