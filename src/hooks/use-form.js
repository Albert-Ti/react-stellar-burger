import React from 'react'

export const useForm = () => {
  const [form, setForm] = React.useState({
    name: localStorage.getItem('name'),
    email: localStorage.getItem('email'),
    password: sessionStorage.getItem('password'),
    codeEmail: ''
  })

  if (form.name) localStorage.setItem('name', form.name)
  if (form.email) localStorage.setItem('email', form.email)
  if (form.password) sessionStorage.setItem('password', form.password)

  return { form, setForm }
}
