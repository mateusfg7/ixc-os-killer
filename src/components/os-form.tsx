"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Crosshair, Loader2, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { cn } from "~/lib/utils";
import { Calendar } from "./ui/calendar";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import FileInput from "./file-input";

export const osFormSchema = z.object({
  ids: z.string({ required_error: "IDs não podem estar vazios" }),
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

type OSFormProps = {
  onSubmit: (values: z.infer<typeof osFormSchema>) => void;
  loading?: boolean;
};

export function OSForm({ onSubmit, loading = false }: OSFormProps) {
  const form = useForm<z.infer<typeof osFormSchema>>({
    resolver: zodResolver(osFormSchema),
    defaultValues: {
      start_date: new Date(),
      end_date: new Date(),
      date: new Date(),
      message: `O.S. Encerrada via API | by IXC OS Killer ${new Date().toLocaleString()}`,
      diagnostic_id: "277",
    },
  });

  const idCount = form.watch("ids")
    ? form
        .watch("ids")
        .split(",")
        .filter((id) => id !== "").length
    : 0;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
        <div className="flex gap-2 items-stretch justify-between">
          <FormField
            control={form.control}
            name="ids"
            render={({ field }) => (
              <div className="flex-1 flex flex-col justify-between">
                <FormItem>
                  <div>
                    <FormLabel htmlFor="ids">IDs das OS/Atendimentos</FormLabel>
                    <FormDescription>
                      Adicione as IDs separadas por espaços, vírgula ou quebra
                      de linha.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Textarea
                      className="h-32 resize-none"
                      placeholder="0000, 0001, 0002, 0003, 0004, 0005, ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
            )}
          />

          <div className="flex items-center text-sm text-muted-foreground">
            ou
          </div>

          <div className="flex-1">
            <FileInput
              onUpload={(ids) => form.setValue("ids", ids.join(", "))}
            />
          </div>
        </div>
        <div className="flex gap-5">
          <FormField
            control={form.control}
            name="start_date"
            render={({ field }) => (
              <FormItem>
                <div>
                  <FormLabel className="block m-0">Data de Início</FormLabel>
                  <FormDescription>Quando a O.S. foi iniciada?</FormDescription>
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
                          date > new Date() || date < new Date("1900-01-01")
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
                          date > new Date() || date < new Date("1900-01-01")
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
                          date > new Date() || date < new Date("1900-01-01")
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
          {idCount < 1 && (
            <span className="text-muted-foreground">Lista de IDs vazia</span>
          )}
          {idCount == 1 && (
            <span>{idCount} Ordem de serviço será finalizada</span>
          )}
          {idCount > 1 && (
            <span>{idCount} Ordens de serviço serão finalizadas</span>
          )}
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
            {loading ? (
              <Button
                type="submit"
                className="flex gap-2 items-center justify-center"
                disabled
              >
                <Loader2
                  size="1.2rem"
                  strokeWidth="1.5px"
                  className="animate-spin"
                />
                <span>Finalizar O.S.</span>
              </Button>
            ) : (
              <Button
                type="submit"
                className="flex gap-2 items-center justify-center"
              >
                <Crosshair size="1.2rem" strokeWidth="1px" />
                <span>Finalizar O.S.</span>
              </Button>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
}
