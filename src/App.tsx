import {Application} from './components/Application'
import {Departments} from './components/Departments'
import {Courses} from './components/Courses'

import {useDepartments, useCourses, useWallet} from './hooks'

import {useState} from 'react'

function App() {
  const {buyCourses, addCourseToWallet, removeCourseFromWallet} = useWallet()
  const {departments} = useDepartments()
  const [selectedDepartment, setSelectedDepartment] = useState<string>('IT-Сфера')
  const courses = useCourses(selectedDepartment)

  return (
    <div style={{width: 1200, margin: '0 auto', paddingBottom: 50}}>
      <h1 className="title">ОТДЕЛЕНИЕ ДОПОЛНИТЕЛЬНОГО ПРОФЕССИОНАЛЬНОГО ОБРАЗОВАНИЯ</h1>
      <Departments
        departments={departments}
        selectedDepartment={selectedDepartment}
        onSelectDepartment={setSelectedDepartment}
      />
      <Courses
        courses={courses}
        buyCourses={buyCourses}
        onBuyCourse={addCourseToWallet}
        onRemoveCourseFromWallet={removeCourseFromWallet}
      />
      <Application
        buyCourses={buyCourses}
      />
    </div>
  )
}

export default App
