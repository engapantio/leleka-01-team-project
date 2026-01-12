import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import JourneyPageClient from "./JourneyPage.client";
import { getJourneyByWeekAndTab } from "@/lib/api/serverApi";

type JourneyPageProps = {
  params: Promise<{ weekNumber: string }>;
};

const JourneyPage = async ({ params }: JourneyPageProps) => {
  const { weekNumber } = await params;

  const week = Number(weekNumber); 

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["weekBaby", week, 'baby'],
    queryFn: () => getJourneyByWeekAndTab(week, 'baby'),
  });

  await queryClient.prefetchQuery({
    queryKey: ["weekMom", week, 'mom'],
    queryFn: () => getJourneyByWeekAndTab(week, 'mom'),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <JourneyPageClient />
  </HydrationBoundary>
  );
};

export default JourneyPage;
