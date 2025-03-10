import { useState } from 'react'

export const useField = (type) => {
    const [value, setValue] = useState(event.target.value)

    const onChange = (e) => {
        setValue(e.target.value)
    }

    const reset = () => {
        setValue('')
    }

    return {
        type,
        value,
        onChange,
        reset
    }
}