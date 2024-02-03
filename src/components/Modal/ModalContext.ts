import * as React from 'react'

export type ModalType = React.FunctionComponent<any>;

export interface ModalContextType {
  showModal(key: string, component: ModalType): void;

  hideModal(key: string): void;
}

const invariantViolation = () => {
  throw new Error(
    'Attempted to call useModal outside of modal context. Make sure your app is rendered inside ModalProvider.'
  )
}

export const ModalContext = React.createContext<ModalContextType>({
  showModal: invariantViolation,
  hideModal: invariantViolation
})
ModalContext.displayName = 'ModalContext'
