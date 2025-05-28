import ListItem from "./ListItem";

export default function GroupList({ data, mutate }: { data: []; mutate: any }) {
  return (
    <div className="my-2 grid grid-cols-1 gap-4">
      {data.length > 0
        ? data?.map((item: any) => (
            <ListItem mutate={mutate} key={item.tg_id} item={item} />
          ))
        : ""}
    </div>
  );
}
