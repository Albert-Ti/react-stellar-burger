import React from 'react'

export const useForm = (inputValue = {}) => {
  const [values, setValues] = React.useState(inputValue)

  const handleChanges = event => {
    const { name, value } = event.target
    setValues({ ...values, [name]: value })
    sessionStorage.setItem(name, value)
  }

  return { values, setValues, handleChanges }
}
