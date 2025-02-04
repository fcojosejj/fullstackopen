const Header = (props) => {
  return (
    <h1>Name of the course: {props.course.name}</h1>
  )
}

const Part = (props) => {
  return(
    <div>
      <p>Part {props.index} {props.part}. Number of exercises: {props.exercises}</p>
    </div>
  )
}

const Content = (props) => {

  const parts = props.course.parts

  return(
    <div>
      <Part index={1} part={parts[0].name} exercises={parts[0].exercises} />
      <Part index={2} part={parts[1].name} exercises={parts[1].exercises} />
      <Part index={3} part={parts[2].name} exercises={parts[2].exercises} />
    </div>
  )
}

const Total = (props) => {
  const parts = props.course.parts
  return(
    <div>
      <p>Total exercises: {parts.reduce((a, b) => a + b.exercises, 0)}</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default App