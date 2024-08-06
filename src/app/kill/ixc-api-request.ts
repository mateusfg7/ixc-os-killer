import { env } from "~/env";

type Payload = {
  id_chamado: string;
  data_inicio: string;
  data_final: string;
  mensagem: string;
  id_tecnico: string;
  gera_comissao: string; // "S"
  status: string; // "F"
  data: string;
  finaliza_processo: string; // "S"
  id_su_diagnostico: string;
};

export type BasicPayload = Omit<
  Payload,
  "id_chamado" | "gera_comissao" | "status" | "finaliza_processo"
>;

type IxcApiRequestProps = {
  id: string;
  token: string;
  basicPayload: BasicPayload;
};
export async function ixcApiRequest({
  id,
  token,
  basicPayload,
}: IxcApiRequestProps) {
  const { IXC_API_URL } = env;
  const base64token = Buffer.from(token).toString("base64");

  const {
    data,
    data_final,
    data_inicio,
    id_su_diagnostico,
    id_tecnico,
    mensagem,
  } = basicPayload;

  const payload: Payload = {
    gera_comissao: "S",
    status: "F",
    finaliza_processo: "S",

    id_chamado: id,
    data_inicio,
    data_final,
    mensagem,
    id_tecnico,
    data,
    id_su_diagnostico,
  };

  const status: {
    code: number;
    message: string;
    ixc_body?: {
      type: string;
      message: string;
    };
  } = await fetch(IXC_API_URL, {
    body: JSON.stringify(payload),
    method: "POST",
    headers: {
      Authorization: `Basic ${base64token}`,
      "Content-Type": "application/json",
    },
  })
    .then(async (res) => {
      const ixc_body: { type: string; message: string } = await res.json();
      return {
        code: res.status,
        message: res.statusText,
        ixc_body,
      };
    })
    .catch((e) => {
      console.error(e);
      return { code: 500, message: "[IXC O.S. Killer] Internal Server Error" };
    });

  return {
    id,
    status,
  };
}
