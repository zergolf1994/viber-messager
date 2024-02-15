import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const AdminLayout = async ({
    children
}: {
    children: React.ReactNode
}) => {

    const session = await auth();
    if (session?.user.role != "ADMIN") {
        //redirect("/")
    }

    return (
        <>{children}</>
    );
}

export default AdminLayout;