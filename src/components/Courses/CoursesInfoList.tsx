import {IDepartmentItem} from '../../hooks/useDepartments.ts'

import {CourseModalFooterTemplate, CourseModalTemplate} from './CourseModal.tsx'
import {CoursesItem} from './CoursesItem.tsx'
import {Modal} from '../Modal/Modal.tsx'

import {useModal} from '../../hooks'

import React, {useState} from 'react'

interface ICoursesInfoListProps {
  courses: IDepartmentItem[]
  onSelect: (course: IDepartmentItem) => void
}

export const CoursesInfoList = (props: ICoursesInfoListProps) => {
  const [openCourseInfo, setOpenCourseInfo] = useState<IDepartmentItem>()
  const [showModal, hideModal] = useModal(() => (
    openCourseInfo &&
    <Modal
      body={
        <CourseModalTemplate
          course={openCourseInfo}
        />
      }
      footer={
        <CourseModalFooterTemplate
          course={openCourseInfo}
          onSelectCourse={props.onSelect}
          hideModal={hideModal}/>
      }
      image={openCourseInfo.image}
    />
  ), [openCourseInfo, props.onSelect])

  const openCourse = (selectCourse: IDepartmentItem) => {
    setOpenCourseInfo(selectCourse)
    showModal()
  }

  return (
    <React.Fragment>
      <div className="block all-course">
        <p className="block__title text"
           data-subtitle="(нажмите на интересующий курс для получения информации)">Список курсов</p>
        <div className="course-wrap">
          {
            props.courses.map(course => (
              <CoursesItem
                key={course.title}
                course={course}
                onClick={openCourse}
              />
            ))
          }
        </div>
      </div>
    </React.Fragment>
  )
}
