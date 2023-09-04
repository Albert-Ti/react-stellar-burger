import React from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import IngredientDetails from '../components/ingredient-details/ingredient-details'
import Modal from '../components/modal/modal'
import { OnlyAuth, OnlyUnAuth } from '../hoc/protected-route'
import BurgerDietails from '../pages/burger-dietails'
import ErrorPage from '../pages/error-page'
import FeedOrders from '../pages/feed-orders'
import ForgotPassword from '../pages/forgot-password'
import HistoryOrders from '../pages/history-orders'
import Home from '../pages/home'
import Ingredient from '../pages/ingredient'
import Layout from '../pages/layout'
import Login from '../pages/login'
import Profile from '../pages/profile'
import ProfileUser from '../pages/profile-user'
import Register from '../pages/register'
import ResetPassword from '../pages/reset-password'
import { fetchIngredients } from '../redux/actions/ingredients-action'
import { fetchCheckUser } from '../redux/actions/user-action'

function App() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const background = location.state && location.state.background

  React.useEffect(() => {
    dispatch(fetchCheckUser())
    dispatch(fetchIngredients())
  }, [])

  const ingredientModal = (
    <Modal onClose={() => navigate(-1)}>
      <IngredientDetails />
    </Modal>
  )

  return (
    <>
      <Routes location={background || location}>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/ingredients/:id' element={<Ingredient />} />
          <Route path='/feed' element={<FeedOrders />} />
          <Route path='/feed/:id' element={<BurgerDietails />} />
          <Route path='/profile' element={<OnlyAuth element={<Profile />} />}>
            <Route index element={<OnlyAuth element={<ProfileUser />} />} />
            <Route path='/profile/order' element={<OnlyAuth element={<HistoryOrders />} />} />
          </Route>
          <Route path='/profile/order/:id' element={<OnlyAuth element={<BurgerDietails />} />} />
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
