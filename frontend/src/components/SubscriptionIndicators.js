import { graphql, useStaticQuery } from "gatsby";
import React, { useContext, useEffect, useRef, useState } from "react";

import { useLocalUser, useUserMutation } from "hooks/useUser";
import indicateursSteps from "utils/indicateursSteps";
import recommandationsSteps from "utils/recommandationsSteps";
import ModalContext from "utils/ModalContext";
import Navigation from "./subscription/Navigation";
import Newsletter from "./subscription/Newsletter";
import Notifications from "./subscription/Notifications";
import Progress from "./subscription/Progress";
import Question from "./subscription/Question";
import Identity from "./subscription/Identity";
import EndIndicateurs from "./subscription/EndIndicateurs";
import EndRecommandations from "./subscription/EndRecommandations";

const indicateursStepsOrder = Object.keys(indicateursSteps);

export default function SubscriptionIndicators() {
  const notifications = {};

  const [currentStepName, setCurrentStepName] = useState(
    indicateursStepsOrder[0]
  );
  const scrollRef = useRef(null);
  useEffect(() => {
    scrollRef?.current?.scrollTo({ top: 0, behavior: "instant" });
  }, [currentStepName]);

  const { setSubscription, setNeedConfirmation } = useContext(ModalContext);
  const [modal, setModal] = useState(false);

  const localUser = useLocalUser();
  const mutation = useUserMutation();

  const currentIndicateurStep = indicateursSteps[currentStepName];
  const currentRecommandationStep = recommandationsSteps[currentStepName];

  return (
    <div
      ref={(ref) => (scrollRef.current = ref?.parentElement)}
      className="flex max-h-full flex-col"
    >
      {!!currentIndicateurStep && (
        <>
          <Progress
            steps={Object.values(indicateursSteps)}
            currentStep={currentIndicateurStep}
          />
          {currentStepName === "validation" ? (
            <Identity
              onNextStep={() => {
                window?._paq?.push([
                  "trackEvent",
                  "Subscription",
                  "Next",
                  currentStepName,
                ]);
                setNeedConfirmation(false);
                setCurrentStepName("indicateurs_end");
              }}
            />
          ) : (
            <Question
              mutateUser={localUser.mutateUser}
              step={currentIndicateurStep}
              setModal={setModal}
            />
          )}
          <Navigation
            prevStepVisible={currentStepName !== indicateursStepsOrder[0]}
            nextStepDisabled={
              !localUser.user[currentStepName]?.length &&
              currentIndicateurStep.mandatory
            }
            isLastButton={
              currentStepName ===
              indicateursStepsOrder[indicateursStepsOrder.length - 1]
            }
            onPrevStep={() => {
              window?._paq?.push([
                "trackEvent",
                "Subscription",
                "Prev",
                currentStepName,
              ]);
              switch (currentStepName) {
                default:
                case "indicateurs":
                  break;
                case "indicateurs_frequence":
                  setCurrentStepName("indicateurs");
                  break;
                case "indicateurs_media":
                  setCurrentStepName("indicateurs_frequence");
                  break;
                case "validation":
                  setCurrentStepName("indicateurs_media");
                  break;
              }
            }}
            onNextStep={() => {
              window?._paq?.push([
                "trackEvent",
                "Subscription",
                "Next",
                currentStepName,
              ]);
              switch (currentStepName) {
                default:
                  break;
                case "validation":
                  setCurrentStepName("indicateurs_end");
                  break;
                case "indicateurs":
                  setCurrentStepName("indicateurs_frequence");
                  break;
                case "indicateurs_frequence":
                  setCurrentStepName("validation");
                  break;
              }
            }}
            forceCurrentStep={() => {
              setCurrentStepName("validation");
            }}
          />
        </>
      )}
      {currentStepName === "indicateurs_end" && (
        <EndIndicateurs
          onClose={() => {
            localUser.mutateUser({
              recommandations: ["non"],
            });
            mutation.mutate({
              ...localUser.user,
              recommandations: ["non"],
            });
            window?._paq?.push([
              "trackEvent",
              "Subscription",
              "Success",
              "indicateurs",
            ]);
            window?._paq?.push([
              "trackEvent",
              "Subscription",
              "EndIndicateurs",
              "backToHome",
            ]);
            setSubscription(null);
          }}
          onNextStep={() => {
            localUser.mutateUser({
              recommandations: ["oui"],
            });
            mutation.mutate({
              ...localUser.user,
              recommandations: ["oui"],
            });
            window?._paq?.push([
              "trackEvent",
              "Subscription",
              "Success",
              "indicateurs",
            ]);
            window?._paq?.push([
              "trackEvent",
              "Subscription",
              "Success",
              "recommandations",
            ]);
            window?._paq?.push([
              "trackEvent",
              "Subscription",
              "EndIndicateurs",
              "subscribeToRecommandations",
            ]);
            setNeedConfirmation(false);
            setCurrentStepName("activites");
          }}
        />
      )}
    </div>
  );
}
