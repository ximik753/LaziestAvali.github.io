import React from 'react'

import {IDepartment} from '../../hooks/useDepartments.ts'

import {DepartmentsItem} from './DepartmentsItem.tsx'

interface IDepartmentsProps {
  departments: IDepartment[]
  rowElementsCount?: number
  selectedDepartment?: string
  onSelectDepartment: React.Dispatch<React.SetStateAction<string>>
}

const useDepartmentsItemGroup = (departments: IDepartment[], rowElementsCount: number = 3): IDepartment[][] => {
  const itemsGroups: IDepartment[][] = []
  for (let i = 0; i < departments.length; i += rowElementsCount) {
    itemsGroups.push(departments.slice(i, i + rowElementsCount))
  }
  return itemsGroups
}

export const Departments = (props: IDepartmentsProps) => {
  const departmentsGroups = useDepartmentsItemGroup(props.departments, props.rowElementsCount)

  return (
    <>
      <p className="text">Нажмите на интересующие вас направления для просмотра существующих курсов</p>
      <div className="wrap">
        {
          departmentsGroups.map((group, index) => (
            <div className="row" key={index}>
              {group.map(({title, options}) => (
                <DepartmentsItem
                  selected={props.selectedDepartment === title}
                  title={title}
                  key={title}
                  customColor={options.circleColor}
                  onClick={props.onSelectDepartment}
                />
              ))}
            </div>
          ))
        }
      </div>
    </>
  )
}
