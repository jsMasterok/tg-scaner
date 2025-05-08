import GroupClient from "./GroupClient";

export default async function Page({ params }: { params: { id: string } }) {
  return <GroupClient id={params.id} />;
}
