import { getUserLists } from "@/data/user.data";
import { DataTable } from "./data-table";
import { Payment, columns } from "./columns"
import { SearchParams } from "@/types";
import { searchParamsSchema } from "@/schemas/validations";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    // ...
  ]
}

export interface UserPageProps {
  searchParams: SearchParams
}

export default async function UserPage({ searchParams }: UserPageProps) {

  const search = searchParamsSchema.parse(searchParams)
  console.log(search)
  const data = await getData()

  return (
    <>
      <div className="container mx-auto py-10">
        <DataTable
          columns={columns}
          data={data}
        />
      </div>
    </>
  );
}
