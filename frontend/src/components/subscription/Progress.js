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
                  ? "font-medium text-main"
                  : "font-normal text-main/30",
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
      <div className="flex h-1 w-full overflow-hidden rounded-full bg-main/20 md:h-2">
        <div
          className="h-full w-full origin-left rounded-full border bg-main transition-transform"
          style={{
            transform: `scaleX(${currentStep.step / steps.length})`,
          }}
        />
      </div>
    </div>
  );
}
