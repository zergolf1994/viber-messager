import { ChatSkeleton, CreateChat } from "@/components/admin/chats/client";
import { ChatLists } from "@/components/admin/chats/server";
import { searchParamsSchema } from "@/schemas/validations";
import { AdminChatPageProps } from "@/types/page";
import { Suspense } from "react";


export default async function AdminChatPage({ searchParams }: AdminChatPageProps) {

  const search = searchParamsSchema.parse(searchParams)

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-4 gap-2">
        <Suspense
          key={`chat-record-${new URLSearchParams(search as any).toString()}`}
          fallback={<ChatSkeleton length={Number(search?.per_page) || 10} />}
        >
          <ChatLists />
        </Suspense>
      </div>
    </div>
  );
}
