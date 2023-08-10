import React from "react";

export default function Progress({ steps, currentStep }) {
  return (
    <div className="w-full">
      <ul className="hidden md:flex">
        {steps.map((step, index) => {
          return (
            <li
              key={step.name}
              className={[
                "shrink-0 grow basis-0 text-center",
                step.title === currentStep.title
                  ? "text-main font-medium"
                  : "text-main/30 font-normal",
              ].join(" ")}
            >
              {step.title}
            </li>
          );
        })}
      </ul>
      <p className="mb-2 mt-8 w-full text-center md:hidden">
        {currentStep.title}
      </p>
      <div className="bg-main/20 flex h-1 w-full overflow-hidden rounded-full md:h-2">
        <div
          className="bg-main h-full w-full origin-left rounded-full border transition-transform"
          style={{
            transform: `scaleX(${currentStep.step / steps.length})`,
          }}
        />
      </div>
    </div>
  );
}
