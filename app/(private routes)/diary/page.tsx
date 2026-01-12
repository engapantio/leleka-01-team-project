export default async function DiaryPage(props: {
  params: Promise<{ [key: string]: string | string[] | undefined }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  await props.params;
  await props.searchParams;
  return <div>DiaryPage</div>;
}
