"use client";

import { useState } from "react";
import * as z from "zod";

import { OSForm, osFormSchema } from "~/components/os-form";

// sleep simulation function
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function Home() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(values: z.infer<typeof osFormSchema>) {
    setLoading(true);

    const parsedValues = {
      ...values,
      ids: values.ids.split(",").map((id) => id.trim()),
      date: values.date.toISOString(),
      start_date: values.start_date.toISOString(),
      end_date: values.end_date.toISOString(),
      token: values.token.length > 0 ? values.token : undefined,
    };

    await fetch("/kill", {
      method: "POST",
      body: JSON.stringify(parsedValues),
    })
      .then(async (response) => {
        console.log(response);
        const body = await response.json();

        console.log(body);
      })
      .catch((err) => console.error(err));
    setLoading(false);
  }

  return (
    <div className="space-y-10">
      <div className="space-y-5">
        <div>
          <OSForm onSubmit={onSubmit} loading={loading} />
        </div>
      </div>
    </div>
  );
}
