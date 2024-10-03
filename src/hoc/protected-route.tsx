import React from 'react'
import {useSelector} from 'react-redux'
import {Navigate, useLocation} from 'react-router-dom'
import Preloader from '../components/UI/preloader/preloader'
import {userStore} from '../redux/user/slice'

type TProtectedProps = {
  onlyUnAuth?: boolean
  element: JSX.Element
}

const Protected: React.FC<TProtectedProps> = ({onlyUnAuth = false, element}) => {
  const {isAuthChecked, user} = useSelector(userStore)

  const location = useLocation()

  if (!isAuthChecked) {
    return <Preloader />
  }

  if (onlyUnAuth && user) {
    const {from}: {from: {pathname: string}} = location.state || {from: {pathname: '/'}}
    return <Navigate to={from.pathname} />
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{from: {pathname: location}}} />
  }
  return element
}

export const OnlyAuth = Protected
export const OnlyUnAuth: React.FC<TProtectedProps> = ({element}) => (
  <Protected onlyUnAuth={true} element={element} />
)
