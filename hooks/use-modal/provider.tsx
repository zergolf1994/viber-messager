"use client"

import { useCallback, useReducer, useRef } from "react";
import { ModalSettings, ModalsContextProps, ModalsProviderProps, OpenConfirmModal } from "./types";

import { ModalsContext } from "./context";
import { modalsReducer } from "./reducer";
import { useModalsEvents } from './events';
import Modal, { ModalRootProps } from "@/components/ui/modal";
import { ConfirmModal } from "./modals/confirm";


function separateConfirmModalProps(props: OpenConfirmModal) {
    if (!props) {
        return { confirmProps: {}, mainProps: {} };
    }

    const {
        id,
        children,
        onCancel,
        onConfirm,
        closeOnConfirm,
        closeOnCancel,
        cancelProps,
        confirmProps,
        labels,
        title,
        mainProps,
        ...others
    } = props;

    return {
        confirmProps: {
            id,
            children,
            onCancel,
            onConfirm,
            closeOnConfirm,
            closeOnCancel,
            cancelProps,
            confirmProps,
            labels,
            title
        },
        mainProps,
    };
}

export function ModalsProvider({ children }: ModalsProviderProps) {

    const [state, dispatch] = useReducer(modalsReducer, { modals: [], current: null });

    const stateRef = useRef(state);
    stateRef.current = state;

    const openModal = useCallback(
        ({ modalId, ...props }: ModalSettings) => {
            const id = modalId as string;
            dispatch({
                type: 'OPEN',
                modal: {
                    id,
                    type: 'content',
                    props,
                },
            });
            return id;
        },
        [dispatch]
    );

    const openConfirmModal = useCallback(
        ({ modalId, ...props }: OpenConfirmModal) => {
            const id = modalId as string;
            dispatch({
                type: 'OPEN',
                modal: {
                    id,
                    type: 'confirm',
                    props,
                },
            });
            return id;
        },
        [dispatch]
    );
    const closeModal = useCallback(
        (id: string, canceled?: boolean) => {
            dispatch({ type: 'CLOSE', modalId: id, canceled });
        },
        [dispatch]
    );

    const closeAll = useCallback(
        (canceled?: boolean) => {
            dispatch({ type: 'CLOSE_ALL', canceled });
        },
        [dispatch]
    );
    useModalsEvents({
        openModal,
        openConfirmModal,
        closeModal,
        closeAllModals: closeAll
    });

    const getCurrentModal = () => {
        const currentModal = stateRef.current.current;
        switch (currentModal?.type) {
            case 'content': {
                const { children: currentModalChildren, mainProps, ...rest } = currentModal.props;
                return {
                    modalProps: mainProps,
                    content: <>{currentModalChildren}</>,
                };
            }
            case 'confirm': {
                const { mainProps, confirmProps: separatedConfirmProps } =
                    separateConfirmModalProps(currentModal.props);

                return {
                    modalProps: Object.assign({ backDropClose: false, withCloseBtn: false, size: "sm" }, mainProps as ModalRootProps),
                    content: (
                        <ConfirmModal
                            {...separatedConfirmProps}
                            id={currentModal.id}
                            labels={currentModal.props.labels}
                        />),
                };
            }
            default: {
                return {
                    modalProps: { backDropClose: false, withCloseBtn: false },
                    content: null,
                };
            }
        }
    }

    const ctx: ModalsContextProps = {
        modals: state.modals,
        openModal,
        closeModal,
        closeAll,
        openConfirmModal
    }
    const { modalProps: currentModalProps, content } = getCurrentModal();

    
    return (
        <ModalsContext.Provider value={ctx}>
            {children}
            <Modal
                isOpen={state.modals.length > 0 ? true : false}
                onClose={() => { closeModal(state.current!.id) }}
                {...currentModalProps}
            >
                {content}
            </Modal>
        </ModalsContext.Provider>
    )
}