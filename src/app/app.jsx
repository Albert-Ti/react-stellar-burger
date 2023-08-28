import React from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes, useLocation } from 'react-router-dom'
import IngredientDetails from '../components/ingredient-details/ingredient-details'
import Modal from '../components/modal/modal'
import { OnlyAuth, OnlyUnAuth } from '../hoc/protected-route'
import { useAuth } from '../hooks/use-auth'
import ErrorPage from '../pages/error-page'
import ForgotPassword from '../pages/forgot-password'
import Home from '../pages/home'
import Ingredient from '../pages/ingredient'
import Layout from '../pages/layout'
import Login from '../pages/login'
import Profile from '../pages/profile'
import Register from '../pages/register'
import ResetPassword from '../pages/reset-password'
import { catchError, getItems, loadItems } from '../redux/slice/ingredients-slice'
import { getIngredients } from '../utils/api'

function App() {
  const dispatch = useDispatch()
  const { checkUser } = useAuth()

  const location = useLocation()
  const background = location.state && location.state.background

  React.useEffect(() => {
    checkUser()
    dispatch(loadItems(true))
    getIngredients()
      .then(data => dispatch(getItems(data)))
      .catch(err => dispatch(catchError(err)))
  }, [])

  const ingredientModal = (
    <Modal>
      <IngredientDetails />
    </Modal>
  )

  return (
    <>
      <Routes location={background || location}>
        <Route path='/' element={<Layout />}>
          <Route path='/ingredients' element={<Home />} />
          <Route path='/ingredients/:id' element={<Ingredient />} />
          <Route path='/profile' element={<OnlyAuth element={<Profile />} />} />
          <Route path='/register' element={<OnlyUnAuth element={<Register />} />} />
          <Route path='/login' element={<OnlyUnAuth element={<Login />} />} />
          <Route path='/forgot-password' element={<OnlyUnAuth element={<ForgotPassword />} />} />
          <Route path='/reset-password' element={<OnlyUnAuth element={<ResetPassword />} />} />
          <Route path='/*' element={<ErrorPage />} />
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route path='/ingredients/:id' element={ingredientModal} />
        </Routes>
      )}
    </>
  )
}

export default App

/* 
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'ingredients',
        element: <ProtectedRoute element={<Home />} />,
        children: [
          {
            path: '/ingredients/:id',
            element: <ProtectedRoute element={ingredientModal} />
          }
        ]
      },
      {
        path: 'profile',
        element: <ProtectedRoute element={<Profile />} />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />
      },
      {
        path: 'reset-password',
        element: <ResetPassword />
      }
    ]
  }
])
*/
