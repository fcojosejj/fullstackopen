const Course = ({ course }) => {
    return (
        <>
            <h1>{course.id}. {course.name}</h1>
            <ul>
                {course.parts.map((part) => <li key={part.id}>{part.name}. Number of exercises: {part.exercises}</li>)}
            </ul>
            <p>Total number of exercises: {course.parts.reduce((acc, part) => acc + part.exercises, 0)}</p>
        </>
    )
}

export default Course