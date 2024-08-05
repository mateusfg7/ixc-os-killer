"use client";

import { useState } from "react";
import * as z from "zod";
import FileInput from "~/components/file-input";
import { OSForm, osFormSchema } from "~/components/os-form";
import { Separator } from "~/components/ui/separator";
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
      <div className="flex gap-2 items-stretch justify-between">
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <label htmlFor="ids">IDs das OS/Atendimentos</label>
            <span className="block text-sm text-muted-foreground">
              Adicione as IDs separadas por espaços, vírgula ou quebra de linha.
            </span>
          </div>
          <Textarea
            className="min-h-32"
            placeholder="0000, 0001, 0002, 0003, 0004, 0005, ..."
            id="ids"
            value={ids}
            onChange={(e) => setIDs(e.target.value)}
          />
        </div>

        <Separator orientation="vertical" />
        <div className="w-px  bg-muted-foreground/50" />

        <div className="flex-1">
          <FileInput onUpload={(ids) => setIDs(ids.join(", "))} />
        </div>
      </div>
      <div className="space-y-5">
        <h2 className="text-lg">Informações de Fechamento</h2>
        <div>
          <OSForm onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
}
