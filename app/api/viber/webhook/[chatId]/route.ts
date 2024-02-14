export const runtime = "edge"

export async function POST(request: Request, context: any) {

    try {

        const chatId = context.params.chatId // '1'
        const json = await request.json()

        console.log(json)

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