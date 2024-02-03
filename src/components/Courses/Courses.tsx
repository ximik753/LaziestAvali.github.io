import {IDepartmentItem} from '../../hooks/useDepartments.ts'

import {CoursesInfoList} from './CoursesInfoList.tsx'
import {CoursesBuyList} from './CoursesBuyList.tsx'

import React from 'react'

interface ICoursesProps {
  courses: IDepartmentItem[]
  buyCourses: IDepartmentItem[]
  onBuyCourse: (course: IDepartmentItem) => void
  onRemoveCourseFromWallet: (course: IDepartmentItem | null, all?: boolean) => void
}

export const Courses = (props: ICoursesProps) => {
  return (
    <React.Fragment>
      <div className="block-wrap">
        <CoursesInfoList
          courses={props.courses}
          onSelect={props.onBuyCourse}
        />
        <CoursesBuyList
          courses={props.buyCourses}
          onRemove={props.onRemoveCourseFromWallet}
        />
      </div>
      <div className="button-wrap">
        <button
          className="button remove"
          onClick={() => props.onRemoveCourseFromWallet(null, true)}
        >Удалить все выбранные курсы</button>
        <button
          className="button accent send"
        >Заполнить заявку</button>
      </div>
    </React.Fragment>
  )
}
