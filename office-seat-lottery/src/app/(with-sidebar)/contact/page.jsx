'use client'
import React from "react"

import { InquiryForm } from "@/components/form/inquiry-form"
import { SiteHeader } from "@/components/sidebar/site-header"

export default function Home() {
  return (
    <>
      <SiteHeader title="問い合わせ" />
      <main className="flex-1 overflow-auto p-4 flex justify-center items-center min-h-screen">
        <div className="w-full max-w-md">
          <InquiryForm />
        </div>
      </main>
    </>
  )
}
