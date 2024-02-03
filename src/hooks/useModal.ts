import {useContext, useEffect, useState, useCallback, useMemo, DependencyList} from 'react'
import {ModalContext, ModalType} from '../components/Modal/ModalContext'

type ShowModal = () => void;
type HideModal = () => void;

const generateModalKey = (() => {
  let count = 0

  return () => `${++count}`
})()

const isFunctionalComponent = (Component: Function) => {
  const prototype = Component.prototype

  return !prototype || !prototype.isReactComponent
}

export const useModal = (
  component: ModalType,
  inputs: DependencyList = []
): [ShowModal, HideModal] => {
  if (!isFunctionalComponent(component)) {
    throw new Error(
      'Only stateless components can be used as an argument to useModal. You have probably passed a class component where a function was expected.'
    )
  }

  const key = useMemo(generateModalKey, [])
  const modal = useMemo(() => component, inputs)
  const context = useContext(ModalContext)
  const [isShown, setShown] = useState<boolean>(false)
  const showModal = useCallback(() => setShown(true), [])
  const hideModal = useCallback(() => setShown(false), [])

  useEffect(() => {
    if (isShown) {
      context.showModal(key, modal)
    } else {
      context.hideModal(key)
    }

    return () => context.hideModal(key)
  }, [modal, isShown])

  return [showModal, hideModal]
}
