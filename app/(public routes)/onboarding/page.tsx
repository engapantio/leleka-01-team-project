import OnboardingForm from '@/components/OnboardingForm/OnboardingForm';

export default async function OnboardingPage(props: {
  params: Promise<{ [key: string]: string | string[] | undefined }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Unwrap params and searchParams to avoid serialization issues
  await props.params;
  await props.searchParams;
  return <OnboardingForm />;
}
