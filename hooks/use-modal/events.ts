import { createUseExternalEvents } from "@/hooks/create-use-external-events";
import { ModalsEvents } from "./types";

export const [useModalsEvents, createEvent] =
    createUseExternalEvents<ModalsEvents>('modals');


export const openModal = createEvent('openModal');
export const openConfirmModal = createEvent('openConfirmModal');

export const closeModal = createEvent('closeModal');
export const closeAllModals = createEvent('closeAllModals');

export const modals: {
    open: ModalsEvents['openModal'];
    closeModal: ModalsEvents['closeModal'];
    openConfirmModal: ModalsEvents['openConfirmModal'];
    closeAll: ModalsEvents['closeAllModals'];
} = {
    open: openModal,
    closeModal: closeModal,
    openConfirmModal,
    closeAll: closeAllModals,
};