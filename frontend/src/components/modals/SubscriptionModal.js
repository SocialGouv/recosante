import FocusTrap from "focus-trap-react";
import React, { useContext } from "react";

import SubscriptionIndicators from "components/SubscriptionIndicators";
import Modal from "components/base/Modal";
import ModalContext from "utils/ModalContext";

export default function SubscriptionModal() {
  const { subscription, setSubscription } = useContext(ModalContext);

  return (
    <FocusTrap
      active={subscription === "indicators"}
      focusTrapOptions={{ allowOutsideClick: true, escapeDeactivates: false }}
    >
      <Modal open={subscription} setOpen={setSubscription} large>
        {subscription === "indicators" && <SubscriptionIndicators />}
      </Modal>
    </FocusTrap>
  );
}
