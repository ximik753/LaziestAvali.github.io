import {IDepartmentItem} from './useDepartments.ts'

import {useState} from 'react'

export const useWallet = () => {
  const [buyCourses, setBuyCourses] = useState<IDepartmentItem[]>([])

  const addCourseToWallet = (course: IDepartmentItem) => {
    const courseExists = buyCourses.find(buyCourse => buyCourse === course)
    if (!courseExists) {
      setBuyCourses(prevState => [...prevState, course])
    }
  }

  const removeCourseFromWallet = (course: IDepartmentItem | null, all: boolean = false) => {
    const confirmResult = confirm(`Вы хотите удалить ${all ? 'все курсы' : 'данный курс'} из корзины?`)
    if (!confirmResult) {
      return
    }
    if (all) {
      setBuyCourses([])
      return
    }
    const filteredCourses = buyCourses.filter(buyCourse => buyCourse !== course)
    setBuyCourses(filteredCourses)
  }

  return {
    buyCourses,
    addCourseToWallet,
    removeCourseFromWallet
  }
}
