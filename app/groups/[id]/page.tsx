import GroupClient from "./GroupClient";

export default async function Page({ params }: { params: any }) {
  return <GroupClient id={params.id} />;
}
