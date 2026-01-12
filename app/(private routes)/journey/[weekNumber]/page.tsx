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
  const tab = "baby";

  await queryClient.prefetchQuery({
    queryKey: ["weekBaby", week, tab],
    queryFn: () => getJourneyByWeekAndTab(week, tab),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <JourneyPageClient />
  </HydrationBoundary>
  );
};

export default JourneyPage;