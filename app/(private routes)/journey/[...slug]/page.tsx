import React from 'react';
import JourneyPageClient from './[weekNumber]/JourneyPage.client';

import css from './JourneyPage.module.css';

export default async function JourneyPage(props: {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  await props.params;
  await props.searchParams;
  return (
    <section className={css.section_block}>
      <JourneyPageClient />
    </section>
  );
}
