import PropTypes from 'prop-types'
import { Navigate, useLocation } from 'react-router-dom'

import { useSelector } from 'react-redux'
import Preloader from '../components/UI/preloader/preloader'
import { userStore } from '../redux/user/user-slice'

const Protected = ({ onlyUnAuth = false, element }) => {
  const { isAuthChecked, user } = useSelector(userStore)

  const location = useLocation()

  if (!isAuthChecked) {
    return <Preloader />
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: '/' } }
    return <Navigate to={from.pathname} />
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: { pathname: location } }} />
  }

  return element
}

Protected.propTypes = {
  element: PropTypes.node.isRequired,
  onlyUnAuth: PropTypes.bool
}

export const OnlyAuth = Protected
export const OnlyUnAuth = ({ element }) => <Protected onlyUnAuth={true} element={element} />
