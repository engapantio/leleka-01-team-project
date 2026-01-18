import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchDiaryEntries } from "@/lib/api/serverApi";
import DiaryPageClient from "./DIaryPageClient";

export default async function DiaryPage() {
  const queryClient = new QueryClient();


  await queryClient.prefetchQuery({
    queryKey: ['diaries'],
    queryFn: () => fetchDiaryEntries(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DiaryPageClient />
    </HydrationBoundary>
  );
}
