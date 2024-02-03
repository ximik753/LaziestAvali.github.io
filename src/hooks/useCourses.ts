import {useDepartments} from './useDepartments.ts'

export const useCourses = (departmentTitle: string) => {
  const {getDepartmentByTitle} = useDepartments()
  const department = getDepartmentByTitle(departmentTitle)

  return department ? department.items : []
}
