'use client';
import { redirect } from 'next/navigation';
const PATH = process.env.NEXT_PUBLIC_GATSBY_INTERN_URL || 'http://frontend';

export default function Page({
  params,
}: {
  params: {
    inseeCode: string;
    city: string;
    indicator: string;
  };
}) {
  if (params.inseeCode === 'place') {
    redirect(`${PATH}/place/${params.city}/${params.indicator}`);
  }
  return <h1>Indicator</h1>;
}
