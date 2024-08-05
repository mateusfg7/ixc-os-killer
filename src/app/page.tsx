"use client";

import { useState } from "react";
import * as z from "zod";
import FileInput from "~/components/file-input";
import { OSForm, osFormSchema } from "~/components/os-form";
import { Textarea } from "~/components/ui/textarea";

export default function Home() {
  const [ids, setIDs] = useState<string>("");

  async function kill() {
    await fetch("/kill")
      .then(async (response) => {
        console.log(response);
        const body = await response.json();

        console.log(body);
      })
      .catch((err) => console.error(err));
  }

  function onSubmit(values: z.infer<typeof osFormSchema>) {
    console.log(values);
  }

  return (
    <div className="space-y-10">
      <div>
        <label htmlFor="ids">IDs das OS/Atendimentos</label>
        <span className="block text-sm text-muted-foreground">
          Adicione as IDs separadas por espaços, vírgula ou quebra de linha.
        </span>
        <Textarea
          className="min-h-32"
          id="ids"
          value={ids}
          onChange={(e) => setIDs(e.target.value)}
        />
      </div>
      <div className="space-y-5">
        <h2 className="text-lg">Informações de Fechamento</h2>
        <div>
          <OSForm onSubmit={onSubmit} />
          <FileInput onUpload={(ids) => setIDs(ids.join(", "))} />
        </div>
      </div>
    </div>
  );
}
