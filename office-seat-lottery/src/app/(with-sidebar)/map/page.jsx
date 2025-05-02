import { SiteHeader } from "@/components/sidebar/site-header";

export default async function Home() {
  return (
    <>
      <SiteHeader title="座席図" />
      <main className="flex-1 overflow-hidden p-4 flex items-center justify-center">
        <div className="h-full w-full flex items-center justify-center">
          <img
            src="/sheet/座席表.png"
            alt="座席表"
            className="max-h-full max-w-full object-contain"
          />
        </div>
      </main>
    </>
  );
}