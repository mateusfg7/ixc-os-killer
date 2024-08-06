import { env } from "~/env";
import { BasicPayload, ixcApiRequest } from "./ixc-api-request";

type RequestBody = {
  ids: string[];
  start_date: string;
  end_date: string;
  message: string;
  technician_id: string | number;
  date: string;
  diagnostic_id: string | number;
  token?: string;
};

type Result = {
  id: string;
  status: {
    code: number;
    message: string;
  };
};

export async function POST(request: Request) {
  const { IXC_TOKEN } = env;

  const {
    date,
    diagnostic_id,
    end_date,
    ids,
    message,
    start_date,
    technician_id,
    token,
  }: RequestBody = await request.json();

  const basicPayload: BasicPayload = {
    data_inicio: start_date,
    data_final: end_date,
    mensagem: message,
    id_tecnico: String(technician_id),
    data: date,
    id_su_diagnostico: String(diagnostic_id),
  };

  let success_requests: Result[] = [];
  let error_requests: Result[] = [];

  for (const id of ids) {
    const result = await ixcApiRequest({
      id,
      token: token ? (token as string) : IXC_TOKEN,
      basicPayload,
    });

    if (
      result.status.code !== 200 ||
      result.status.ixc_body?.type === "error"
    ) {
      error_requests.push(result);
    } else {
      success_requests.push(result);
    }
  }

  return new Response(
    JSON.stringify({
      success_requests,
      error_requests,
    })
  );

  const my_ip_api = await fetch("https://api.myip.com").then((res) =>
    res.json()
  );

  return new Response(
    JSON.stringify({
      // ixc_response: responseBody,
      // status: response.status,
      message: "Sucesso",
      my_ip_api,
    }),
    { status: 200 }
  );
}
