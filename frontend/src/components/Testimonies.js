import React, { useRef } from "react";

const testimonies = [
  "Je trouve votre newsletter et les informations transmises très claires et très pratiques. Le format court et synthétique est particulièrement pertinent (idem pour les conseils). Merci beaucoup, continuez sur cette voie !",
  "Je trouve votre newsletter et les informations transmises très claires et très pratiques.",
  "Je trouve votre newsletter et les informations transmises très claires et très pratiques. Le format court et synthétique est particulièrement pertinent (idem pour les conseils).",
  "Le format court et synthétique est particulièrement pertinent (idem pour les conseils). Merci beaucoup, continuez sur cette voie !",
  "Je trouve votre newsletter et les informations transmises très claires et très pratiques. Le format court et synthétique est particulièrement pertinent (idem pour les conseils). Merci beaucoup, continuez sur cette voie !",
  "Je trouve votre newsletter et les informations transmises très claires et très pratiques.",
  "Je trouve votre newsletter et les informations transmises très claires et très pratiques. Le format court et synthétique est particulièrement pertinent (idem pour les conseils).",
  "Le format court et synthétique est particulièrement pertinent (idem pour les conseils). Merci beaucoup, continuez sur cette voie !",
];

export default function Testimonies() {
  const scrollView = useRef(null);
  return (
    <section className="mx-auto mb-10 max-w-prose xl:mb-40 xl:max-w-6xl">
      <h2 className="px-6">
        <strong>Nos utilisateurs en parlent</strong> mieux que nous
      </h2>
      <div className="flex items-center">
        <button
          className="hidden shrink-0 xl:block"
          type="button"
          onClick={() => {
            scrollView.current.scrollBy({
              left: -320,
              behavior: "smooth",
            });
          }}
        >
          <Arrow />
        </button>
        <div
          ref={scrollView}
          className="flex w-full snap-x snap-proximity items-start gap-x-2 overflow-x-auto px-6"
        >
          {testimonies.map((testimony, index) => {
            return (
              <blockquote
                key={index}
                className="snap snap snap my-4 flex max-w-xs shrink-0 basis-11/12 snap-center snap-always items-start gap-x-3 rounded-lg bg-main/5 p-4 text-base text-xs text-neutral-700"
              >
                <Quote />
                {testimony}
              </blockquote>
            );
          })}
        </div>
        <button
          className="hidden shrink-0 rotate-180 xl:block"
          type="button"
          onClick={() => {
            scrollView.current.scrollBy({
              left: 320,
              behavior: "smooth",
            });
          }}
        >
          <Arrow />
        </button>
      </div>
    </section>
  );
}

function Quote() {
  return (
    <svg
      className="h-4 w-4 shrink-0"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.5897 4C20.0429 4 20.4103 4.36736 20.4103 4.82051V16.3077C20.4103 16.7609 20.0429 17.1282 19.5897 17.1282H7.65538L4 20V4.82051C4 4.36736 4.36736 4 4.82051 4H19.5897ZM18.7692 5.64103H5.64103V16.6236L7.08786 15.4872H18.7692V5.64103ZM10.9869 7.61977L11.3531 8.18494C9.98484 8.92529 10.0088 10.1144 10.0088 10.3709C10.136 10.3533 10.2696 10.351 10.4019 10.3633C11.1422 10.4319 11.7256 11.0396 11.7256 11.7949C11.7256 12.5879 11.0827 13.2308 10.2897 13.2308C9.84948 13.2308 9.4285 13.0296 9.16243 12.7471C8.73976 12.2984 8.51282 11.7949 8.51282 10.9786C8.51282 9.54292 9.52062 8.25587 10.9869 7.61977ZM15.0895 7.61977L15.4557 8.18494C14.0874 8.92529 14.1113 10.1144 14.1113 10.3709C14.2386 10.3533 14.3722 10.351 14.5045 10.3633C15.2447 10.4319 15.8282 11.0396 15.8282 11.7949C15.8282 12.5879 15.1853 13.2308 14.3923 13.2308C13.9521 13.2308 13.5311 13.0296 13.265 12.7471C12.8423 12.2984 12.6154 11.7949 12.6154 10.9786C12.6154 9.54292 13.6232 8.25587 15.0895 7.61977Z"
        fill="#000091"
      />
    </svg>
  );
}

function Arrow() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.417 20.0012L26.6665 11.7515L24.3095 9.39453L13.7028 20.0012L24.3095 30.6077L26.6665 28.2507L18.417 20.0012Z"
        fill="#000091"
      />
    </svg>
  );
}
