import { env } from "~/env";

export async function GET() {
  const { IXC_API_URL, IXC_TOKEN } = env
  
  const id = 416812;
  const data_hora_atual = new Date().toISOString();

  const base64token = Buffer.from(IXC_TOKEN).toString('base64');

  const payload = {
    id_chamado: id,
    data_inicio: data_hora_atual,
    data_final: data_hora_atual,
    mensagem:
      "O.S Finalizada por API | Testes na ferramenta online OS Killer | DESCONSIDERAR",
    id_tecnico: "481", // 481 Mateus Felipe Gonçalves
    gera_comissao: "S",
    status: "F",
    data: data_hora_atual,
    finaliza_processo: "S",
    id_su_diagnostico: "268",
  };

  const response = await fetch(IXC_API_URL, {
    body: JSON.stringify(payload),
    method: "POST",
    headers: {
      Authorization: `Basic ${base64token}`,
      "Content-Type": "application/json",
    },
  })

  const responseBody = await response.json()

  const my_ip_api = await fetch("https://api.myip.com").then((res) => res.json())

  return new Response(JSON.stringify({
    ixc_response: responseBody,
    status: response.status,
    my_ip_api
  }))
}
