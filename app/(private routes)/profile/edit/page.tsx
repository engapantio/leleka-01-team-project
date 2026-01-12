export default async function EditPage(props: {
  params: Promise<{ [key: string]: string | string[] | undefined }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  await props.params;
  await props.searchParams;
  return <div>Empty Placeholder</div>;
}
