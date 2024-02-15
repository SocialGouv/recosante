import { PageBuilderService } from '@/services/page-builder';

interface PageProps {
  params: {
    inseeCode: string;
    city: string;
    indicator: string;
  };
}

export default function Page(props: PageProps) {
  return (
    <div className='flex justify-center items-center h-screen flex-col'>
      <h1 className='text-3xl'>Bienvenu à {props.params.city}</h1>
      <h1 className='text-3xl font-bold'>
        Vous regardez l'indicateur {props.params.indicator}
      </h1>
    </div>
  );
}
<<<<<<< Updated upstream
=======

export async function getStaticPaths() {
  const params = PageBuilderService.getMunicipalitiesParams();
  console.log(params);
  return {
    paths: params,
    fallback: false,
  };
}
>>>>>>> Stashed changes
