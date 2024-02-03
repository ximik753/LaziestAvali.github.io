import {JSX} from 'react'

export interface IModalProps {
  body: JSX.Element
  footer: JSX.Element
  image: string
}

export const Modal = (props: IModalProps) => {

  return (
    <div className="modal show">
      <div className="modal-container">
        {
          props.image &&  <img className="modal__img" src={props.image} alt="alt"/>
        }
        <div className="modal-content">
          {props.body}
          <div className="modal-block">
            <div className="modal-block">
              {props.footer}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
