import {CoursesItem} from './CoursesItem.tsx'

import {IDepartmentItem} from '../../hooks/useDepartments.ts'

interface ICoursesBuyListProps {
  courses: IDepartmentItem[]
  onRemove: (course: IDepartmentItem) => void
}

export const CoursesBuyList = (props: ICoursesBuyListProps) => {
  return (
    <div className="block selected-course">
      <p className="block__title text" data-subtitle="(нажмите на курс, чтобы отменить выбор)">Выбранные вами
        курсы</p>
      <div className="course-wrap selected">
        {
          props.courses.map(course => (
            <CoursesItem
              key={course.title}
              course={course}
              onClick={props.onRemove}
            />
          ))
        }
      </div>
    </div>
  )
}
