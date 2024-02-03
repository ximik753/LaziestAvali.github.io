import {useCallback, useState, useMemo} from 'react'
import * as React from 'react'
import {ModalType, ModalContext} from './ModalContext'
import {ModalRoot} from './ModalRoot.tsx'

export interface ModalProviderProps {
  container?: Element;
  rootComponent?: React.ComponentType<any>;
  children: React.ReactNode;
}

export const ModalProvider = ({
  container,
  rootComponent,
  children
}: ModalProviderProps) => {
  const [modals, setModals] = useState<Record<string, ModalType>>({})
  const showModal = useCallback(
    (key: string, modal: ModalType) =>
      setModals(modals => ({
        ...modals,
        [key]: modal
      })),
    []
  )
  const hideModal = useCallback(
    (key: string) =>
      setModals(modals => {
        if (!modals[key]) {
          return modals
        }
        const newModals = {...modals}
        delete newModals[key]
        return newModals
      }),
    []
  )
  const contextValue = useMemo(() => ({showModal, hideModal}), [])

  return (
   <ModalContext.Provider value={contextValue}>
     <React.Fragment>
       {children}
       <ModalRoot
         modals={modals}
         component={rootComponent}
         container={container}
       />
     </React.Fragment>
   </ModalContext.Provider>
  )
}
