import { ButtonProps } from "@/components/ui/button";
import { ModalRootProps } from "@/components/ui/modal";
import { ReactNode } from "react";

export interface ModalProps {
    __staticSelector?: string;

    /** Modal content */
    children?: React.ReactNode;
    /** Modal title */
    title?: React.ReactNode;
    mainProps?: ModalRootProps
}

export type ModalSettings = Partial<Omit<ModalProps, 'opened'>> & { modalId?: string };
export type ConfirmLabels = { confirm: string; cancel?: string } | Record<'confirm' | 'cancel', ReactNode>;
export interface OpenConfirmModal extends ModalSettings, ConfirmModalProps { }

export interface OpenContextModal<CustomProps extends Record<string, any> = {}>
    extends ModalSettings {
    innerProps: CustomProps;
}

export interface ConfirmModalProps {
    id?: string;
    children?: React.ReactNode;
    onCancel?: () => void;
    onConfirm?: () => void;
    closeOnConfirm?: boolean;
    closeOnCancel?: boolean;
    cancelProps?: ButtonProps & React.ComponentPropsWithoutRef<'button'>;
    confirmProps?: ButtonProps & React.ComponentPropsWithoutRef<'button'>;
    labels?: ConfirmLabels;
}

export type ModalsEvents = {
    openModal: (payload: any) => void;
    openConfirmModal: (payload: OpenConfirmModal) => void;
    closeModal: (id: string) => void;
    closeAllModals: () => void;
};

export type ModalState =
    | { id: string; props: ModalSettings; type: 'content' }
    | { id: string; props: OpenConfirmModal; type: 'confirm' }
    | { id: string; props: OpenContextModal; type: 'context'; ctx: string };

export interface ModalsContextProps {
    modals: ModalState[];
    openModal: (props: ModalSettings) => string;
    openConfirmModal?: (props: OpenConfirmModal) => string;
    closeModal: (id: string, canceled?: boolean) => void;
    closeAll?: () => void;
}

export interface ModalsProviderProps {
    /** Your app */
    children: React.ReactNode;

    /** Predefined modals */
    //modals?: Record<string, React.FC<any>>;

    /** Shared Modal component props, applied for every modal */
    //modalProps?: ModalSettings;

    /** Confirm modal labels */
    //labels?: ConfirmLabels;
}

export interface ConfirmModalProps {
    id?: string;
    children?: React.ReactNode;
    onCancel?: () => void;
    onConfirm?: () => void;
    closeOnConfirm?: boolean;
    closeOnCancel?: boolean;
    cancelProps?: ButtonProps & React.ComponentPropsWithoutRef<'button'>;
    confirmProps?: ButtonProps & React.ComponentPropsWithoutRef<'button'>;
    labels?: ConfirmLabels;
}