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

    const [tab, setTab] = useState<Tab>('baby');    

    const { data, isLoading, error } = useQuery({
    queryKey: ["weekBaby", week, tab],
    queryFn: () => getJourneyByWeekAndTab(week, tab),
    refetchOnMount: false,
    });
    
     if (isLoading) return <p>Loading...</p>;

    if (error || !data) return <p>Some error..</p>;
    
    const handleTabBaby = () => {
        setTab('baby');
    };

    const handleTabMom = () => {
        setTab('mom');
    };

    return <div><JourneyDetails selectedTab={ tab} data={data} selectBabyFn={ handleTabBaby} selectMomFn={ handleTabMom} /></div>;
};

export default JourneyPageClient;