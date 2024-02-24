import React from 'react'
import Image from "next/image"
import Link from "next/link"

export const LogoNextJs = () => {
    return (
        <Link href="/">
            <Image
                className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert w-32"
                src="/next.svg"
                alt="Next.js Logo"
                width={0}
                height={0}
                sizes="100vw"
                priority
            />
        </Link>
    )
}
