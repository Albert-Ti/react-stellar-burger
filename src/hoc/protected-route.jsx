import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/use-auth'
import Preloader from '../pages/preloader/preloader'

const Protected = ({ onlyUnAuth = false, element }) => {
  const { isAuthChecked, user } = useAuth()
  const location = useLocation()

  if (!isAuthChecked) {
    return <Preloader />
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: '/ingredients' } }
    return <Navigate to={from.pathname} />
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: { pathname: location } }} />
  }

  return element
}

export const OnlyAuth = Protected
export const OnlyUnAuth = ({ element }) => <Protected onlyUnAuth={true} element={element} />
