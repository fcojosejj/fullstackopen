import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StaticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ title, good, neutral, bad, total, average, positive }) => {
  if (total === 0) return <p>No feedback given</p>
  return (
    <table>
      <thead>
        <tr>
          <td><h1>{title}</h1></td>
        </tr>
      </thead>
      <tbody>
        <StaticLine text="good" value={good} />
        <StaticLine text="neutral" value={neutral} />
        <StaticLine text="bad" value={bad} />
        <StaticLine text="total" value={total} />
        <StaticLine text="average" value={average} />
        <StaticLine text="positive" value={positive + ' %'} />
      </tbody>
    </table>

  )
}

const App = () => {

  const [clicks, setClicks] = useState({
    good: 0, neutral: 0, bad: 0
  })

  const total = clicks.good + clicks.neutral + clicks.bad
  const average = (clicks.good * 1 + clicks.neutral * 0 + clicks.bad * (-1)) / total
  const positive = (clicks.good / (clicks.good + clicks.bad + clicks.neutral)) * 100

  return (
    <>
      <h1>give feedback</h1>
      <Button text="good" onClick={() => setClicks({ ...clicks, good: clicks.good + 1 })} />
      <Button text="neutral" onClick={() => setClicks({ ...clicks, neutral: clicks.neutral + 1 })} />
      <Button text="bad" onClick={() => setClicks({ ...clicks, bad: clicks.bad + 1 })} />

      <Statistics title="statistics" good={clicks.good} neutral={clicks.neutral} bad={clicks.bad} total={total} average={average} positive={positive} />
    </>
  )
}

export default App