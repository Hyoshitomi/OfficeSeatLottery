"use client";
import React, { useState } from "react";
import { SiteHeader } from '@/components/sidebar/site-header'
import { MultiSelect } from "@/components/multi-select";
import { Cat, Dog, Fish, Rabbit, Turtle } from "lucide-react";

const frameworksList = [
  { value: "react", label: "React", icon: Turtle },
  { value: "angular", label: "Angular", icon: Cat },
  { value: "vue", label: "Vue", icon: Dog },
  { value: "svelte", label: "Svelte", icon: Rabbit },
  { value: "ember", label: "Ember", icon: Fish },
];

export default function Home() {
  const [selectedFrameworks, setSelectedFrameworks] = useState(["react", "angular"]);

  return (
    <>
      <SiteHeader title="抽選"/>
      <div className="p-4 max-w-xl">
        <h1 className="text-2xl font-bold mb-4">Multi-Select Component</h1>
        <MultiSelect
          options={frameworksList}
          onValueChange={setSelectedFrameworks}
          defaultValue={selectedFrameworks}
          placeholder="Select frameworks"
          variant="inverted"
          animation={2}
          maxCount={3}
        />
        {/* <div className="mt-4">
          <h2 className="text-xl font-semibold">Selected Frameworks:</h2>
          <ul className="list-disc list-inside">
            {selectedFrameworks.map((framework) => (
              <li key={framework}>{framework}</li>
            ))}
          </ul>
        </div> */}
      </div>
    </>
  );
}









async function handleLottery(employeeNumbers) {
  const res = await fetch('/api/lottery', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ employeeNumbers })
  });
  const data = await res.json();
  if (res.ok) {
    // 抽選結果を画面に表示するなど
    console.log('抽選結果:', data.result);
  } else {
    alert(data.error);
  }
}

// 使い方例
handleLottery(['10001', '10002', '10003']);
