import useUrlB64ToUint8Array from "hooks/useUrlB64ToUint8Array";
import { useEffect, useRef, useState } from "react";

export default function useNotificationsPrompt(sw, applicationServerKey) {
  const [error, setError] = useState(false);
  const [prompting, setPrompting] = useState(false);

  const applicationServerKeyAsUint8Array =
    useUrlB64ToUint8Array(applicationServerKey);

  const registrationRef = useRef(null);
  useEffect(() => {
    if (typeof window !== "undefined" && window.ENV.APP_PLATFORM === "native") {
      return null;
    }
    if (typeof navigator === "undefined") return null;
    const supported = "serviceWorker" in navigator;

    if (!supported) return null;
    navigator.serviceWorker.register(sw).then(async (registration) => {
      registrationRef.current = registration;
      // https://developer.mozilla.org/en-US/docs/Web/API/PushManager/permissionState#return_value
      // 'prompt', 'denied', or 'granted'
      // https://developer.apple.com/documentation/usernotifications/sending_web_push_notifications_in_web_apps_safari_and_other_browsers
      // https://developer.apple.com/notifications/safari-push-notifications/
      // const permission = await registration.pushManager.permissionState({
      //   userVisibleOnly: true,
      //   applicationServerKey: applicationServerKeyAsUint8Array,
      // });
      // const subscription = await registration.pushManager.getSubscription({
      //   userVisibleOnly: true,
      //   applicationServerKey: applicationServerKeyAsUint8Array,
      // });
      // // registration.unregister();
    });
  }, [sw, applicationServerKeyAsUint8Array]);

  const subscribe = async () => {
    setPrompting(true);
    try {
      const pushSubscription =
        await registrationRef.current?.pushManager.subscribe({
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
