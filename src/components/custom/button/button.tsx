import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:translate-y-0.5",
    {
        variants: {
            variant: {
                default: "", outline: "", ghost: "", link: "",
            },
            colors: {
                primary: "", danger: "", success: "", warning: "", secondary: "",
            },
            size: {
                none: "",
                sm: ["text-sm", "py-1", "px-2"],
                md: ["text-base", "py-1.5", "px-2.5"],
                lg: ["text-lg", "py-2", "px-4"],
            },
            radius: {
                none: "rounded-none", sm: "rounded-sm", md: "rounded-md", lg: "rounded-lg", full: "rounded-full",
            },
            widthFull: { true: "w-full" }
        },
        compoundVariants: [
            {
                variant: "default",
                colors: "primary",
                class: "bg-blue-500 hover:bg-blue-600",
            },
            {
                variant: "default",
                colors: "danger",
                class: "bg-red-500 hover:bg-red-600",
            },
            {
                variant: "default",
                colors: "success",
                class: "bg-green-500 hover:bg-green-600",
            },
            {
                variant: "default",
                colors: "warning",
                class: "bg-amber-500 hover:bg-amber-600",
            },
            {
                variant: "default",
                colors: "secondary",
                class: "bg-gray-500 hover:bg-gray-600",
            },
            {
                variant: "default",
                colors: ["primary", "danger", "secondary", "success", "warning"],
                class: "text-white",
            },
            // outline
            {
                variant: "outline",
                class: "border-2",
            },
            {
                variant: "outline",
                colors: "primary",
                class: "border-blue-500 hover:border-blue-600 text-blue-500",
            },
            {
                variant: "outline",
                colors: "danger",
                class: "border-red-500 hover:border-red-600 text-red-500",
            },
            {
                variant: "outline",
                colors: "success",
                class: "border-green-500 hover:border-green-600 text-green-500",
            },
            {
                variant: "outline",
                colors: "warning",
                class: "border-amber-500 hover:border-amber-600 text-amber-500",
            },
            {
                variant: "outline",
                colors: "secondary",
                class: "border-gray-500 hover:border-gray-600 text-gray-500",
            },
        ],
        defaultVariants: {
            variant: "default",
            size: "md",
            colors: "primary",
            radius: "md"
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, colors, radius, asChild = false, widthFull, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, colors, radius, widthFull, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }