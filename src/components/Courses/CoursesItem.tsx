import {IDepartmentItem} from '../../hooks/useDepartments.ts'

interface ICourseProps {
  course: IDepartmentItem
  onClick?: (course: IDepartmentItem) => void
}

export const CoursesItem = (props: ICourseProps) => {
  return (
    <>
      <div
        className="course"
        tabIndex={0}
        onClick={() => props.onClick && props.onClick(props.course)}
      >
        <p className="course__text">{props.course.title}</p>
        <div
          className="course__img"
          style={{background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url("${props.course.image}") center / cover`}}
        ></div>
      </div>
    </>
  )
}
