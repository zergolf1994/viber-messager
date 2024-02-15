"use client";

import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreateChatSchema, DeleteChatSchema } from "@/schemas/chats.schema";
import { modals } from "@/hooks/use-modal";
import { CreateViberAction, DeleteViberAction } from "@/actions/chat.action";

export const CreateChatForm = () => {

    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof CreateChatSchema>>({
        resolver: zodResolver(CreateChatSchema),
        defaultValues: {
            token: "",
            type: "viber"
        },
    })
    const onSubmit = (values: z.infer<typeof CreateChatSchema>) => {
        startTransition(async () => {
            const data = await CreateViberAction(values)
            if (data.error) {
                toast({
                    title: "Error",
                    description: (
                        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                            <code className="text-white">{data.message}</code>
                        </pre>
                    ),
                })
                return
            } else {
                modals.closeAll()
            }
        })
    }

    return (
        <>
            <Tabs
                defaultValue={form.getValues('type')}
                className="w-full"
                onValueChange={(e) => {
                    form.reset()
                    form.setValue('type', e)
                }}
            >
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="viber">Viber</TabsTrigger>
                    <TabsTrigger value="group" disabled={true}>Group</TabsTrigger>
                </TabsList>
                <TabsContent value="viber">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="token"
                                disabled={isPending}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Token</FormLabel>
                                        <FormControl>
                                            <Input placeholder="token" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                disabled={isPending}
                            >Submit</Button>
                        </form>
                    </Form>
                </TabsContent>
                <TabsContent value="group">
                    <div className="aspect-square">
                        Soon.
                    </div>
                </TabsContent>
            </Tabs>
        </>
    )
}

export const DeleteChatForm = ({ chatId }: { chatId: string }) => {

    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof DeleteChatSchema>>({
        resolver: zodResolver(DeleteChatSchema),
        defaultValues: {
            chatId
        },
    })
    const onSubmit = (values: z.infer<typeof DeleteChatSchema>) => {
        startTransition(async () => {
            const data = await DeleteViberAction(values)
            if (data.error) {
                toast({
                    title: "Error",
                    description: (
                        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                            <code className="text-white">{data.message}</code>
                        </pre>
                    ),
                })
                return
            } else {
                modals.closeAll()
            }
        })
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="flex justify-end items-center gap-3">
                        <Button
                            type="button"
                            disabled={isPending}
                            onClick={() => modals.closeAll()}
                            variant="outline"
                        >Cancle</Button>
                        <Button
                            type="submit"
                            disabled={isPending}
                            variant="destructive"
                        >Delete</Button>
                    </div>
                </form>
            </Form>
        </>
    )
}