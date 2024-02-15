
import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

const modalVariants = cva(
    [
        'w-full',
        'transform',
        'align-middle',
        'transition-all',
        'text-left'
    ],
    {
        variants: {
            variant: {
                default: "bg-white shadow-xl",
                ghost: ""
            },
            size: {
                xs: "max-w-[300px]",
                sm: "max-w-sm",
                md: "max-w-md",
                lg: "max-w-3xl",
                full: "min-h-screen",
            },
            rounded: {
                none: "",
                sm: "rounded-sm",
                md: "rounded-md",
                lg: "rounded-lg",
                full: "rounded-full"
            },
        },
        defaultVariants: {
            variant: "default",
            size: "md",
            rounded: "md",
        },
    }
)
export interface ModalRootProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof modalVariants> {
    id?: string | undefined;
    isOpen?: boolean;
    backDropClose?: boolean;
    withCloseBtn?: boolean;
    onClose?: () => void;
}

const Modal = ({ children, size, rounded, variant, className, isOpen = false, backDropClose = true, withCloseBtn = true, onClose }: ModalRootProps) => {

    const [shake, setShake] = useState(false)

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-[31]"
                onClose={() => {
                    if (backDropClose && onClose) {
                        onClose()
                    } else {
                        setShake(true)
                        window.setTimeout(() => setShake(false), 600)
                    }
                }}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 backdrop-blur backdrop-brightness-75 " />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel
                                className={cn(
                                    modalVariants({ size, rounded, className, variant }),
                                    { "animate-shake": shake }
                                )}
                            >
                                {withCloseBtn && onClose &&
                                    <button
                                        className={cn(
                                            "absolute",
                                            "flex items-center justify-center",
                                            "w-6 h-6",
                                            "rounded-full",
                                            "top-1",
                                            {
                                                "right-1 lg:-right-7": size != "full",
                                                "right-1": size == "full"
                                            },
                                            "bg-gray-900 opacity-50 hover:opacity-90",
                                        )}
                                        onClick={() => { onClose && onClose() }}
                                    >
                                        <X className="text-white" size="20" />
                                    </button>
                                }
                                <div className="overflow-hidden">
                                    {children}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

Modal.displayName = 'Modal';

interface ModalHeaderProps extends React.HTMLAttributes<HTMLElement> { }
const ModalHeader = ({ children, className }: ModalHeaderProps) => {
    return (
        <div
            className={cn(
                {
                    "p-2": !className
                },
                className)
            }
        >
            {children}
        </div>
    )
}

ModalHeader.displayName = 'ModalHeader';

interface ModalPlanProps extends React.HTMLAttributes<HTMLElement> { }
const ModalPlan = ({ children, className }: ModalPlanProps) => {
    return (
        <div
            className={cn(
                {
                    "p-2": !className
                },
                className
            )}
        >
            {children}
        </div>
    )
}

ModalPlan.displayName = 'ModalPlan';

interface ModalFooterProps extends React.HTMLAttributes<HTMLElement> { }
const ModalFooter = ({ children, className }: ModalFooterProps) => {
    return (
        <div
            className={cn(
                "flex",
                "items-center",
                "justify-end",
                "gap-2",
                {
                    "p-2":!className
                },
                className
            )}
        >
            {children}
        </div>
    )
}
ModalFooter.displayName = 'ModalFooter';

Modal.Header = ModalHeader
Modal.Plan = ModalPlan
Modal.Footer = ModalFooter


export default Modal