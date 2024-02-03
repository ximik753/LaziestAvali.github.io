import {IDepartmentItem} from '../../hooks/useDepartments.ts'

interface IApplicationProps {
  buyCourses: IDepartmentItem[]
}

const useSelectedCourse = (buyCourses: IDepartmentItem[]) => {
  if (buyCourses.length === 0) {
    return <ul className="form-course">Не выбран ни один курс</ul>
  }
  return (
    <ul className="form-course">
      {
        buyCourses.map(course => (
          <li key={course.title}>{course.title}</li>
        ))
      }
    </ul>
  )
}

export const Application = (props: IApplicationProps) => {
  const selectedCourseTemplate = useSelectedCourse(props.buyCourses)

  return (
    <form action="#" className="form">
      <div className="form-left">
        <p>Выбранные курсы:</p>
        {selectedCourseTemplate}
      </div>
      <div className="form-content">
        <div className="form-inputs">
          <div className="form-row">
            <label htmlFor="fio" className="form__label">ФИО:</label>
            <input className="form__input" id="fio" required type="text"/>
          </div>
          <div className="form-row">
            <label htmlFor="number" className="form__label">Номер телефона (в формате 89999002121):</label>
            <input className="form__input" id="number" maxLength={11} pattern="[0-9]{11}" required type="tel"/>
          </div>
          <div className="form-row">
            <label htmlFor="group" className="form__label">Номер группы:</label>
            <input className="form__input" id="group" maxLength={6} required/>
          </div>
        </div>
        <div className="form-small-text">
          <p>* При наполнении группы более 15 человек возможно уменьшение цены</p>
          <p>* Группа формируется от 10 человек</p>
        </div>

        <div>Стоимость выбранных курсов: <span className="total-price"></span></div>
        <div className="form-buttons">
          <input type="submit" className="button accent" value="Отправить заявку"/>
        </div>
      </div>
    </form>
  )
}
