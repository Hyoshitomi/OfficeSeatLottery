import { DataTable } from "@/components/data-table/data-table"
import { SiteHeader } from '@/components/sidebar/site-header'

import data from "./data.json"

export default function Page() {
  return (
    <AdminGuard user={session?.user} title="予約編集">
      <SiteHeader title={"予約編集"} />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <DataTable data={data} />
            </div>
          </div>
        </div>
    </AdminGuard>
  );
}
