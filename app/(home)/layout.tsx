

const HomeLayout = async ({
    children
}: {
    children: React.ReactNode
}) => {

    return (
        <>
            <aside
                className="fixed bottom-0 z-10 hidden h-full w-72 bg-white shadow  lg:block"
            >
                <div className="sidebar-scrollbar h-full w-full overflow-x-hidden">

                </div>
            </aside>
            <main
                className="relative flex w-full flex-col justify-start transition-[padding] duration-300"
            >
                <div className="h-full p-5 md:p-8">{children}</div>
            </main>
        </>
    );
}

export default HomeLayout;