import {IDepartmentItem} from '../../hooks/useDepartments.ts'

import React from 'react'

interface ICourseModalTemplateProps {
  course: IDepartmentItem
}

interface ICourseModalFooterTemplateProps {
  course: IDepartmentItem
  onSelectCourse: (course: IDepartmentItem) => void
  hideModal: () => void
}


export const CourseModalTemplate = (props: ICourseModalTemplateProps) => {
  return (
    <React.Fragment>
      <div className="modal__title">{props.course.title}</div>
      <div className="modal__text">Количество часов: <span className="hours">{props.course.hours.regular}</span></div>
      <div className="modal__describe">{props.course.describe}</div>
      <div className="modal-block mb left">Стоимость курса: <span className="price">{props.course.price}</span></div>
    </React.Fragment>
  )
}

export const CourseModalFooterTemplate = (props: ICourseModalFooterTemplateProps) => {
  const onSelectCourseHandler = () => {
    props.onSelectCourse(props.course)
    props.hideModal()
  }

  return (
    <React.Fragment>
      <button className="button" onClick={props.hideModal}>Закрыть</button>
      <button
        className="button accent"
        onClick={onSelectCourseHandler}
      >
        Добавить в корзину
      </button>
    </React.Fragment>
  )
}
