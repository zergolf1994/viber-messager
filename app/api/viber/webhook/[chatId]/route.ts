import { createMember, getMemberById, getMemberByToken, updateMemberById } from "@/data/member.data";
import { saveMessage, updateMessageSeen } from "@/data/message.data";

//export const runtime = "edge"

export async function POST(request: Request, context: any) {

    try {

        const chatId = context.params.chatId // '1'
        const { event, message, sender, user, message_token, user_id } = await request.json()

        // ตรวตสอบ member
        let existingMember = null
        switch (event) {
            case "message":
                existingMember = await getMemberByToken(sender.id)
                if (!existingMember) {
                    existingMember = await createMember({
                        subscribed: true,
                        name: sender.name,
                        image: sender.avatar,
                        user_token: sender.id,
                        chatId
                    })
                }

                if (!existingMember?.subscribed) {
                    await updateMemberById(
                        existingMember?.id as string,
                        {
                            subscribed: true,
                            name: sender.name,
                            image: sender.avatar
                        }
                    );
                }

                switch (message.type) {
                    case "text":
                        await saveMessage({
                            chatId,
                            memberId: existingMember?.id,
                            text: message.text,
                            message_token: message_token,
                        })
                        break;

                    default:
                        break;
                }
                break;

            case "seen":
                await updateMessageSeen(message_token);
                break;

            case "unsubscribed":
                existingMember = await getMemberByToken(user_id)
                if (existingMember) {
                    await updateMemberById(existingMember.id, { subscribed: false });
                }
                break;

            case "subscribed":
                existingMember = await getMemberByToken(user.id)
                if (existingMember) {
                    const updateDb = await updateMemberById(
                        existingMember.id,
                        {
                            subscribed: true,
                            name: user.name,
                            image: user.avatar
                        }
                    );
                    //console.log("existingMember", updateDb)
                } else {
                    const saveDb = await createMember({
                        subscribed: true,
                        name: user.name,
                        image: user.avatar,
                        user_token: user.id,
                        chatId
                    })

                    //console.log("createMember", saveDb)
                }
                break;

            default:
                break;
        }


        return new Response(JSON.stringify({ success: true }), {
            status: 200
        })
    } catch (error: any) {
        console.log(error)
        return new Response(JSON.stringify({ error: true }), {
            status: 500
        })
    }

}