import JourneyPageClient from './[weekNumber]/JourneyPage.client';

import css from './JourneyPage.module.css';

const JourneyPage = async () => {
  return (
    <section className={css.section_block}>
      <JourneyPageClient />
    </section>
  );
};

export default JourneyPage;
