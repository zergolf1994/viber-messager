"use client"
import React from 'react'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Skeleton } from '@/components/ui/skeleton'
import { MessageCircleIcon, MessageCirclePlusIcon, Trash2Icon } from 'lucide-react'
import { modals } from '@/hooks/use-modal'
import { CreateChatForm, DeleteChatForm } from './form-chat'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

export const ChatLoading = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <Skeleton className="w-56 h-6" />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Skeleton className="w-full aspect-square" />
            </CardContent>
            <CardFooter className="gap-3">
                <Skeleton className="w-32 h-8" />
                <Skeleton className="w-32 h-8" />
            </CardFooter>
        </Card>
    )
}

export const ChatSkeleton = ({ length }: { length?: number }) => {
    return (
        <>
            {Array.from({ length: length || 1 }).map((n, i) =>
                <ChatLoading key={i} />
            )}
        </>
    )
}

export const CreateChat = () => {
    return (
        <Card
            className="flex items-center justify-center cursor-pointer p-6"
            onClick={() => modals.open({
                children: (
                    <div className="p-4">
                        <CreateChatForm />
                    </div>
                )
            })}
        >
            <div className="flex flex-col items-center gap-3">
                <MessageCirclePlusIcon
                    className="w-20 h-20 text-gray-500"
                />
                <CardDescription>
                    Create New Chat
                </CardDescription>
            </div>
        </Card>
    )
}

export const ChatItem = (row: any) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {row.name}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {row?.image ?
                    <Image
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-full h-auto rounded-lg shadow-lg"
                        alt={`chat_icon_${row?.id}`}
                        src={row?.image}
                    />
                    :
                    <Skeleton className="w-full aspect-square" />
                }
            </CardContent>
            <CardFooter className="gap-3">
                <Button
                    asChild
                    size={"icon"}
                >
                    <Link
                        href={`/chat/${row.id}`}
                    >
                        <MessageCircleIcon />
                    </Link>
                </Button>
                <Button
                    variant={"destructive"}
                    size={"icon"}
                    onClick={() => modals.open({
                        children: (
                            <div className="p-4">
                                <b className="text-lg">Delete Chat</b>
                                <p>
                                    Delete
                                    <span className="text-red-500"> {row.name} </span>
                                    ?
                                </p>
                                <DeleteChatForm chatId={row.id} />
                            </div>
                        )
                    })}
                >
                    <Trash2Icon />
                </Button>
            </CardFooter>
        </Card>
    )
}