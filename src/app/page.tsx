"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, Crosshair, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "~/components/ui/ui/button";
import { Calendar } from "~/components/ui/ui/calendar";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/ui/form";
import { Input } from "~/components/ui/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/ui/popover";
import { Textarea } from "~/components/ui/ui/textarea";
import { cn } from "~/lib/utils";

const formSchema = z.object({
  start_date: z.date().default(new Date()),
  end_date: z.date().default(new Date()),
  message: z
    .string()
    .min(3, "A mensagem deve ter no mínimo 3 caracteres")
    .default(
      `O.S. Encerrado via API | by IXC OS Killer ${new Date().toLocaleString()}`
    ),
  technician_id: z
    .string({ required_error: "ID não pode estar vazio" })
    .min(1, "ID inválido"),
  date: z.date().default(new Date()),
  diagnostic_id: z
    .string({ required_error: "Diagnóstico não pode estar vazio" })
    .min(1, "Diagnóstico inválido")
    .default("277"),
  token: z.string().default(""),
});

export default function Home() {
  async function kill() {
    await fetch("/kill")
      .then(async (response) => {
        console.log(response);
        const body = await response.json();

        console.log(body);
      })
      .catch((err) => console.error(err));
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      start_date: new Date(),
      end_date: new Date(),
      date: new Date(),
      message: `O.S. Encerrada via API | by IXC OS Killer ${new Date().toLocaleString()}`,
      diagnostic_id: "277",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="space-y-10">
      <div>
        <label htmlFor="ids">IDs das OS/Atendimentos</label>
        <span className="block text-sm text-muted-foreground">
          Adicione as IDs separadas por espaços, vírgula ou quebra de linha.
        </span>
        <Textarea className="min-h-32" id="ids" />
      </div>
      <div className="space-y-5">
        <h2 className="text-lg">Informações de Fechamento</h2>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex gap-5">
                <FormField
                  control={form.control}
                  name="start_date"
                  render={({ field }) => (
                    <FormItem>
                      <div>
                        <FormLabel className="block m-0">
                          Data de Início
                        </FormLabel>
                        <FormDescription>
                          Quando a O.S. foi iniciada?
                        </FormDescription>
                      </div>

                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[240px] pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP", { locale: ptBR })
                                ) : (
                                  <span>Selecionar data</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date: Date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="end_date"
                  render={({ field }) => (
                    <FormItem>
                      <div>
                        <FormLabel className="block m-0">
                          Data de Finalização
                        </FormLabel>
                        <FormDescription>
                          Quando a O.S. foi finalizada?
                        </FormDescription>
                      </div>

                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[240px] pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP", { locale: ptBR })
                                ) : (
                                  <span>Selecionar data</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date: Date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <div>
                        <FormLabel className="block m-0">
                          Data de Encerramento
                        </FormLabel>
                        <FormDescription>
                          Para quando será a data de encerramento?
                        </FormDescription>
                      </div>

                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[240px] pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP", { locale: ptBR })
                                ) : (
                                  <span>Selecionar data</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date: Date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <div>
                      <FormLabel>Mensagem de encerramento da O.S.</FormLabel>
                    </div>
                    <FormControl>
                      <Textarea className="min-h-24" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-5">
                <FormField
                  control={form.control}
                  name="technician_id"
                  render={({ field }) => (
                    <FormItem>
                      <div>
                        <FormLabel>ID do Colaborador no IXC</FormLabel>
                        <FormDescription>
                          Para quem a finalização será atribuída?
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Input placeholder="000" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="diagnostic_id"
                  render={({ field }) => (
                    <FormItem>
                      <div>
                        <FormLabel>ID do Diagnóstico no IXC</FormLabel>
                        <FormDescription>
                          Qual será o diagnóstico das O.S.?
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Input placeholder="000" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="token"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <div>
                        <FormLabel>Token de Autenticação</FormLabel>
                        <FormDescription>
                          Deixe vazio para usar o padrão
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Input
                          placeholder="859:a9a20b0dc94a770a241be8f2c1faab303ebba8d9a49697297d382950064c55f0"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-center justify-between">
                <span>50 Ordens de serviço serão finalizadas</span>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    onClick={() => form.reset()}
                    type="button"
                    className="flex gap-2 items-center justify-center"
                  >
                    <Trash2 size="1.2rem" strokeWidth="1px" />
                    <span>Limpar campos</span>
                  </Button>
                  <Button
                    type="submit"
                    className="flex gap-2 items-center justify-center"
                  >
                    <Crosshair size="1.2rem" strokeWidth="1px" />
                    <span>Finalizar O.S.</span>
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
