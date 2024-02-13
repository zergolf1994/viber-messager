import { getUserLists } from "@/data/user.data";

export default async function Home() {

  const rows = await getUserLists();

  return (
    <>
      {rows.map((row) =>
        <p key={row.id}>{row.email}</p>
      )}
    </>
  );
}
