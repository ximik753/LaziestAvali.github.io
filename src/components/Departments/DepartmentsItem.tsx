interface IDepartmentProps {
  selected: boolean
  title: string
  customColor?: string
  onClick: (title: string) => void
}

export const DepartmentsItem = (props: IDepartmentProps) => {
  return (
    <div
      className={`circle ${props.selected && 'selected'}`}
      style={{backgroundColor: props.customColor}}
      onClick={() => props.onClick(props.title)}
    >{props.title}</div>
  )
}
