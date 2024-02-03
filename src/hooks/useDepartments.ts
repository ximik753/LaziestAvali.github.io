import departments from '../assets/json/departments.json'

export interface IDepartmentItem {
  title: string
  describe: string
  image: string
  price: number
  hours: {
    regular: number
    advanced: number
  }
}

export interface IDepartment {
  title: string
  options: {circleColor: string},
  items: IDepartmentItem[]
}

export interface IDepartmentsReturn {
  departments: IDepartment[]
  getDepartmentByTitle(departmentTitle: string): IDepartment | null
}

export const useDepartments = (): IDepartmentsReturn => {
  const getDepartmentByTitle = (departmentTitle: string) => {
    const department: IDepartment | undefined = departments.find(department => department.title === departmentTitle)
    if (department) {
      return department
    }
    return null
  }

  return {
    departments,
    getDepartmentByTitle
  }
}
