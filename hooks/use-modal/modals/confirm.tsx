import { ReactNode } from "react";
import { ConfirmModalProps } from "../types";
import { useModals } from "../use-modals";
import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

interface ConfirmModalProp extends ConfirmModalProps { title?: ReactNode; }

export function ConfirmModal({
    id,
    title,
    cancelProps,
    confirmProps,
    labels = { cancel: '', confirm: '' },
    closeOnConfirm = true,
    closeOnCancel = true,
    onCancel,
    onConfirm,
    children,
}: ConfirmModalProp) {
    const { cancel: cancelLabel, confirm: confirmLabel } = labels;
    const ctx = useModals();

    const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
        typeof cancelProps?.onClick === 'function' && cancelProps?.onClick(event);
        typeof onCancel === 'function' && onCancel();
        closeOnCancel && ctx.closeModal(id!);
    };


    const handleConfirm = (event: React.MouseEvent<HTMLButtonElement>) => {
        typeof confirmProps?.onClick === 'function' && confirmProps?.onClick(event);
        typeof onConfirm === 'function' && onConfirm();
        closeOnConfirm && ctx.closeModal(id!);
    };

    return (
        <>
            <Modal.Header>
                <h3 className="text-xl font-semibold">
                    {title}
                </h3>
            </Modal.Header>
            {children &&
                <Modal.Plan className="p-0">
                    {children}
                </Modal.Plan>
            }
            <Modal.Footer>
                {cancelProps?.children || cancelLabel &&
                    <Button
                        onClick={handleCancel}
                        {...cancelProps}
                    >
                        {cancelProps?.children || cancelLabel}
                    </Button>
                }
                {confirmProps?.children || confirmLabel &&
                    <Button
                        onClick={handleConfirm}
                        {...confirmProps}
                    >
                        {confirmProps?.children || confirmLabel}
                    </Button>
                }
            </Modal.Footer>
        </>
    )
}