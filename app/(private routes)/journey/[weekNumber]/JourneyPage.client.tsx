"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from 'next/navigation';
import { getJourneyByWeekAndTab } from "@/lib/api/clientApi";
import type { Tab } from "@/types/journey";
import { useState } from "react";
import JourneyDetails from "@/components/JourneyDetails/JourneyDetails";

const JourneyPageClient = () => {
    
    const { weekNumber } = useParams<{ weekNumber: string }>();
    const week = Number(weekNumber);

    const [selectedTab, setselectedTab] = useState<Tab>('baby');    

    const { data: babyData, isLoading: isLoadingBabyInfo, error: isErrorBabyInfo } = useQuery({
    queryKey: ["weekBaby", week, 'baby'],
    queryFn: () => getJourneyByWeekAndTab(week, 'baby'),
    refetchOnMount: false,
    });

    const { data: MomData, isLoading: isLoadingMomInfo, error: isErrorMomInfo } = useQuery({
    queryKey: ["weekMom", week, 'mom'],
    queryFn: () => getJourneyByWeekAndTab(week, 'mom'),
    refetchOnMount: false,
    });
    
     if (isLoadingBabyInfo || isLoadingMomInfo) return <p>Loading...</p>;

    if (isErrorBabyInfo || isErrorMomInfo) return <p>Some error..</p>;

    
    const handleTabBaby = () => {
        setselectedTab('baby');
    };

    const handleTabMom = () => {
        setselectedTab('mom');
    };

    return <div><JourneyDetails selectedTab={ selectedTab} babyData={babyData}  momData={MomData} selectBabyFn={ handleTabBaby} selectMomFn={ handleTabMom} /></div>;
};

export default JourneyPageClient;