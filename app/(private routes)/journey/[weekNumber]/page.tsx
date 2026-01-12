import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import JourneyPageClient from "./JourneyPage.client";
import { getBabyState, getMomState } from "@/lib/api/serverApi";

type JourneyPageProps = {
  params: Promise<{ weekNumber: string }>;
};

const JourneyPage = async ({ params }: JourneyPageProps) => {
  const { weekNumber } = await params;

  const week = Number(weekNumber); 

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["weekBaby", week ],
    queryFn: () => getBabyState(week),
  });

  await queryClient.prefetchQuery({
    queryKey: ["weekMom", week],
    queryFn: () => getMomState(week),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <JourneyPageClient />
  </HydrationBoundary>
  );
};

export default JourneyPage;
