'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface SearchProps {
  handlePlaceSelection?: (place: any) => void;
  fullScreen?: boolean;
}

interface Place {
  code: string;
  nom: string;
}

export default function Search({ handlePlaceSelection, fullScreen }: SearchProps) {
  const router = useRouter();

  const formatPlaceUrl = (place: Place) => {
    return `/place/${place.code}/${place.nom.toLowerCase().replace(/\s+/g, '-')}/`;
  };

  const handlePlaceSelect = (place: Place) => {
    if (handlePlaceSelection) {
      handlePlaceSelection(place);
    } else {
      router.push(formatPlaceUrl(place));
    }
  };

  return (
    <div
      className={`relative box-border flex w-full flex-col items-center justify-start bg-gradient-to-r from-[#d1edff] via-[#f8fafd] to-[#d6eeff] ${
        fullScreen ? 'min-h-screen' : ''
      }`}
    >
      <section className="relative mx-auto flex w-full max-w-6xl flex-col pb-6 xl:pt-24">
        <div className="flex flex-col px-6 xl:flex-row-reverse xl:items-start xl:justify-center xl:px-0">
          <CloudAnimated />
          <TitleAnimated />
        </div>
        <div className="relative mb-4 px-6 xl:my-8 xl:px-0">
          <SearchInput
            handlePlaceSelection={handlePlaceSelect}
          />
        </div>
        <SuggestionsButtons />
      </section>
    </div>
  );
}

// Composants temporaires - à remplacer par les vrais composants
function CloudAnimated() {
  return (
    <div className="relative mb-8 xl:mb-0 xl:ml-8">
      <div className="relative h-32 w-32 xl:h-40 xl:w-40">
        <div className="absolute inset-0 rounded-full bg-white/20 backdrop-blur-sm"></div>
        <div className="absolute inset-2 rounded-full bg-white/30"></div>
        <div className="absolute inset-4 rounded-full bg-white/40"></div>
        <div className="absolute inset-6 rounded-full bg-white/50"></div>
      </div>
    </div>
  );
}

function TitleAnimated() {
  return (
    <div className="mb-8 xl:mb-0">
      <h1 className="text-3xl font-bold text-gray-900 xl:text-4xl">
        Voyez l'impact de l'environnement sur votre santé
      </h1>
      <p className="mt-4 text-lg text-gray-600">
        Recevez des alertes et prévisions en temps réel
      </p>
    </div>
  );
}

function SearchInput({ handlePlaceSelection }: { handlePlaceSelection: (place: Place) => void }) {
  const [search, setSearch] = React.useState('');
  const [focus, setFocus] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implémenter la logique de recherche
    console.log('Search submitted:', search);
  };

  return (
    <form
      className="z-[100] mx-auto w-full border border-b-2 border-blue-500/5 border-b-blue-500 bg-white/30 text-[2rem] focus:border-blue-500/20 max-w-xs xl:left-auto xl:mx-0 xl:max-w-2xl xl:translate-x-0 text-xl xl:text-base"
      onSubmit={handleSubmit}
    >
      <div className="relative overflow-hidden">
        <input
          type="text"
          className="w-full border-none bg-transparent py-2 pl-4 pr-3 text-base text-gray-900 outline-blue-500 placeholder:text-gray-500/80 focus:border-blue-500/20"
          title="Entrez votre ville ici"
          placeholder="Entrez votre ville ici"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
        <button
          className="absolute bottom-0 right-0 top-0 m-px cursor-pointer border-none bg-gradient-to-r from-white/10 to-[#eef7ff] to-[30%] pl-6 pr-3 transition-opacity focus:opacity-100 focus:outline-none"
          type="submit"
          aria-label="Valider cette ville"
        >
          <svg
            width="42"
            height="42"
            viewBox="0 0 42 42"
            className="block h-auto w-4"
          >
            <path
              className="fill-blue-500"
              d="M2.52447 23.948C2.69632 23.9759 2.87024 23.9888 3.04425 23.9865L32.6744 23.9865L32.0283 24.287C31.3968 24.5859 30.8222 24.9928 30.3304 25.4891L22.0214 33.7981C20.9271 34.8427 20.7432 36.5232 21.5857 37.7798C22.5662 39.1189 24.4465 39.4096 25.7856 38.4291C25.8938 38.3499 25.9967 38.2635 26.0933 38.1705L41.1187 23.1451C42.2929 21.9722 42.2939 20.0695 41.121 18.8953C41.1203 18.8945 41.1194 18.8937 41.1187 18.8929L26.0933 3.86753C24.9181 2.69564 23.0154 2.69827 21.8435 3.87344C21.7512 3.96594 21.6651 4.06436 21.5857 4.16803C20.7432 5.42463 20.9271 7.10512 22.0214 8.14976L30.3154 16.4738C30.7563 16.9152 31.2632 17.2853 31.818 17.5707L32.7195 17.9764L3.20963 17.9764C1.6745 17.9194 0.327661 18.9917 0.0392677 20.5006C-0.2264 22.1389 0.886232 23.6823 2.52447 23.948Z"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}

function SuggestionsButtons() {
  const suggestions = [
    { name: "Paris", slug: "/place/75056/paris/" },
    { name: "Marseille", slug: "/place/13055/marseille/" },
    { name: "Lyon", slug: "/place/69123/lyon/" },
    { name: "Toulouse", slug: "/place/31555/toulouse/" },
    { name: "Nice", slug: "/place/06088/nice/" },
    { name: "Nantes", slug: "/place/44109/nantes/" },
    { name: "Montpellier", slug: "/place/34172/montpellier/" },
    { name: "Strasbourg", slug: "/place/67482/strasbourg/" },
  ];

  return (
    <div className="overflow-hidden xl:pb-40">
      <ul className="m-0 mx-auto flex gap-3 overflow-x-scroll pb-4 sm:max-w-sm sm:flex-wrap sm:justify-center sm:overflow-auto xl:mx-0 xl:max-w-2xl xl:justify-start xl:pb-0 [&_li]:list-none">
        {suggestions.map((suggestion, index) => {
          return (
            <li
              key={suggestion.slug}
              className={`inline-flex w-auto rounded-full border-2 border-blue-500 ${
                index === 0 ? "ml-6 sm:ml-0" : ""
              } ${
                index === suggestions.length - 1 ? "mr-6 sm:mr-0" : ""
              }`}
            >
              <Link
                className="px-4 py-1 text-xs xl:text-base text-blue-500 hover:text-blue-600"
                href={suggestion.slug}
                onClick={() => {
                  // TODO: Ajouter le tracking Matomo
                  console.log('Suggestion clicked:', suggestion.name);
                }}
              >
                {suggestion.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
} 