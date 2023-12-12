import React from "react";

export default function EndIndicateurs({ onClose, onNextStep }) {
  return (
    <div className="relative z-[2] flex flex-1 flex-col items-center overflow-y-auto pt-6">
      <CheckSvg />
      <h2 className="text-center">
        Félicitations ! Votre demande de notification a bien été prise en
        compte...
      </h2>
      <p className="text-center">
        Vous pouvez également vous inscrire à l’infolettre afin de recevoir un
        email par semaine contenant des conseils adaptés.
      </p>
      <div className="flex w-full flex-col items-center justify-around gap-4 md:flex-row-reverse">
        <button
          className="inline-flex items-center gap-x-2 rounded-full border-2 border-main bg-main px-4 py-3 text-white disabled:opacity-50"
          type="submit"
          form="subscription-form-email"
          onClick={onNextStep}
        >
          S'abonner à l'infolettre
        </button>
        <button
          className="inline-flex items-center gap-x-2 rounded-full bg-white px-4 py-3 text-main"
          type="button"
          onClick={onClose}
        >
          Retourner à l'accueil
        </button>
      </div>
    </div>
  );
}

function CheckSvg() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className="my-8 h-12 w-12 shrink-0"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M40.8012 7.79961C40.4703 7.79961 40.2012 7.53045 40.2012 7.19961C40.2012 6.86874 40.4703 6.59961 40.8012 6.59961C41.132 6.59961 41.4012 6.86874 41.4012 7.19961C41.4012 7.53045 41.132 7.79961 40.8012 7.79961Z"
        fill="#CACAFB"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24.6 45.5999C24.2692 45.5999 24 45.3307 24 44.9999C24 44.669 24.2692 44.3999 24.6 44.3999C24.9308 44.3999 25.2 44.669 25.2 44.9999C25.2 45.3307 24.9308 45.5999 24.6 45.5999Z"
        fill="#CACAFB"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.00039 5.9998C8.66955 5.9998 8.40039 5.73064 8.40039 5.3998C8.40039 5.06894 8.66955 4.7998 9.00039 4.7998C9.33123 4.7998 9.60039 5.06894 9.60039 5.3998C9.60039 5.73064 9.33123 5.9998 9.00039 5.9998Z"
        fill="#CACAFB"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.4034 27.9474L18.5741 23.4208L18.5006 23.3417C18.043 22.8996 17.3489 22.8915 16.892 23.3181C16.4099 23.7684 16.3668 24.5373 16.7943 25.0426L21.712 30.855C21.7433 30.892 21.7776 30.9265 21.8145 30.958C22.1924 31.2808 22.7605 31.2362 23.0834 30.8582L33.602 18.5443L33.6684 18.4588C34.0274 17.9423 33.9592 17.2409 33.5122 16.8193C33.0237 16.3588 32.2669 16.4017 31.8296 16.9137L22.4034 27.9474Z"
        fill="#E1000F"
      />
      <path
        d="M6.86491 27.0215C5.19619 17.5577 11.5153 8.53308 20.9791 6.86436C26.9917 5.80418 33.0181 7.96092 37.0048 12.4357C37.2252 12.6832 37.2033 13.0624 36.9559 13.2829C36.7085 13.5033 36.3292 13.4814 36.1088 13.234C32.396 9.06666 26.7861 7.05895 21.1875 8.04613C12.3764 9.59976 6.49305 18.002 8.04668 26.8131C9.60031 35.6242 18.0026 41.5075 26.8137 39.9539C35.6248 38.4003 41.5081 29.998 39.9544 21.1869C39.8969 20.8606 40.1148 20.5494 40.4411 20.4918C40.7675 20.4343 41.0787 20.6522 41.1362 20.9785C42.8049 30.4423 36.4858 39.467 27.022 41.1357C17.5583 42.8044 8.53363 36.4853 6.86491 27.0215Z"
        fill="#000091"
      />
      <path
        d="M42.135 28.1546C42.2087 27.8315 42.5303 27.6294 42.8534 27.7031C43.1764 27.7768 43.3786 28.0984 43.3049 28.4215C42.4979 31.9593 40.7299 35.1902 38.2163 37.7824C37.9856 38.0203 37.6057 38.0261 37.3678 37.7955C37.1299 37.5648 37.1241 37.1849 37.3548 36.947C39.7166 34.5115 41.3771 31.4768 42.135 28.1546Z"
        fill="#000091"
      />
      <path
        d="M43.2006 25.2C42.8692 25.2 42.6006 25.4686 42.6006 25.8C42.6006 26.1314 42.8692 26.4 43.2006 26.4C43.5319 26.4 43.8006 26.1314 43.8006 25.8C43.8006 25.4686 43.5319 25.2 43.2006 25.2Z"
        fill="#000091"
      />
    </svg>
  );
}
