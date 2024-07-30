"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string>(
    'Clique "START" para executar'
  );
  const [serverIP, setServerIP] = useState("???");

  async function kill() {
    setIsLoading(true);

    await fetch("/kill")
      .then(async (response) => {
        console.log(response);
        const body = await response.json();

        console.log(body);
        if (body.ixc_response.type == "error") {
          setMessage(body.ixc_response.message);
        } else {
          setMessage("Executado com sucesso!");
        }

        setServerIP(body.my_ip_api.ip);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }

  return (
    <div className="flex flex-col justify-center items-center p-10">
      <div className="p-10 text-2xl">
        {isLoading ? (
          <div className="flex items-center gap-3  rounded-lg bg-black/10 p-2 w-fit m-3">
            <span className="text-lg font-semibold">Fazendo requisição</span>
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          message
        )}

        <span className="block">Server IP: {serverIP}</span>
        <span className="block opacity-60 text-sm">
          *Cheque o console | ID O.S 416812
        </span>
      </div>
      <button
        onClick={kill}
        className="p-3 bg-blue-700/10 text-blue-700 hover:text-white hover:bg-blue-700"
      >
        START
      </button>
    </div>
  );
}
