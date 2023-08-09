import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: ${(props) =>
    props.prevButtonVisible ? "space-between" : "flex-end"};

  ${(props) => props.theme.mq.small} {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    background-color: ${(props) => props.theme.colors.background};
    box-shadow: 0 -0.25rem 0.5rem rgba(0, 0, 0, 0.1);
    z-index: 2;
  }
`;
const Bypass = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  font-size: 0.875rem;
  font-weight: 300;
  color: ${(props) => props.theme.colors.main};
  text-decoration: underline;
  cursor: pointer;

  ${(props) => props.theme.mq.small} {
    top: auto;
    bottom: 0rem;
    width: 100%;
    font-size: 0.75rem;
    text-align: center;
  }
`;
export default function Navigation({
  prevStepVisible,
  nextStepDisabled,
  isLastButton,
  onPrevStep,
  onNextStep,
  promptingForNotifications,
  forceCurrentStep,
}) {
  return (
    <Wrapper prevButtonVisible={!!prevStepVisible}>
      {!!prevStepVisible && (
        <button
          className="inline-flex items-center gap-x-2 rounded-full border-2 border-main bg-white px-4 py-2.5 text-main"
          type="button"
          onClick={onPrevStep}
        >
          <svg width="14" height="15" viewBox="0 0 14 24" className="fill-main">
            <path d="M0.000966501 11.9999C0.00096652 11.5698 0.1652 11.1397 0.492974 10.8118L10.8125 0.492339C11.469 -0.164113 12.5333 -0.164113 13.1895 0.492339C13.8457 1.14853 13.8457 2.21264 13.1895 2.86914L4.05818 11.9999L13.1892 21.1308C13.8454 21.7872 13.8454 22.8512 13.1892 23.5074C12.533 24.1641 11.4687 24.1641 10.8122 23.5074L0.492654 13.1881C0.164827 12.86 0.000966482 12.4299 0.000966501 11.9999Z" />
          </svg>{" "}
          Précédent
        </button>
      )}
      {isLastButton ? (
        <button
          className="inline-flex items-center gap-x-2 rounded-full border-2 border-main bg-main px-4 py-2.5 text-white disabled:opacity-50"
          type="submit"
          form="subscription-form-email"
          onClick={onNextStep}
          // () => {
          //   window?._paq?.push(["trackEvent", "Subscription", "Validate"]);
          //   return;
          // }}
          disabled={promptingForNotifications}
        >
          Valider
        </button>
      ) : (
        <button
          className="inline-flex items-center gap-x-2 rounded-full border-2 border-main bg-main px-4 py-2.5 text-white disabled:opacity-50"
          type="button"
          // disabled={
          //   !user[props.steps[props.currentStep].name]?.length &&
          //   props.steps[props.currentStep].mandatory
          // }
          disabled={nextStepDisabled}
          onClick={onNextStep}
          // () => {
          //   window?._paq?.push([
          //     "trackEvent",
          //     "Subscription",
          //     "Next",
          //     props.steps[props.currentStep].name,
          //   ]);
          //   setTimeout(() => {
          //     props.setCurrentStep(props.currentStep + 1);
          //   }, 250);
          // }}
        >
          Suivant
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 24"
            className="fill-background"
          >
            <path d="M14.6416 12.0001C14.6416 12.4302 14.4774 12.8603 14.1496 13.1882L3.83004 23.5077C3.17359 24.1641 2.10926 24.1641 1.45308 23.5077C0.796891 22.8515 0.796891 21.7874 1.45308 21.1309L10.5844 12.0001L1.4534 2.86922C0.79721 2.21277 0.79721 1.14876 1.4534 0.49263C2.10958 -0.164141 3.17391 -0.164141 3.83036 0.49263L14.1499 10.8119C14.4778 11.14 14.6416 11.5701 14.6416 12.0001Z" />
          </svg>
        </button>
      )}
      {promptingForNotifications && (
        <Bypass
          onClick={forceCurrentStep}
          // onClick={() => props.forceCurrentStep(props.currentStep + 1)}
        >
          Passer sans accepter les notifications sur cet appareil
        </Bypass>
      )}
    </Wrapper>
  );
}
