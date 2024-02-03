import {memo, useState, useEffect} from 'react'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {ModalType} from './ModalContext'

interface ModalRootProps {
  modals: Record<string, ModalType>;
  component?: React.ComponentType<any>;
  container?: Element;
}

interface ModalRendererProps {
  component: ModalType;
}

const ModalRenderer = memo(({component, ...rest}: ModalRendererProps) =>
  component(rest)
)

export const ModalRoot = memo(
  ({
     modals,
     container,
     component: RootComponent = React.Fragment
   }: ModalRootProps) => {
    const [mountNode, setMountNode] = useState<Element | undefined>(undefined)

    useEffect(() => setMountNode(container || document.body))

    return mountNode
      ? ReactDOM.createPortal(
        <RootComponent>
          {Object.keys(modals).map(key => (
            <ModalRenderer key={key} component={modals[key]}/>
          ))}
        </RootComponent>,
        mountNode
      )
      : null
  }
)
