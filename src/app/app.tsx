import React from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import IngredientDetails from '../components/ingredient-details/ingredient-details'
import Modal from '../components/modal/modal'
import OrderModal from '../components/order-modal/order-modal'
import { OnlyAuth, OnlyUnAuth } from '../hoc/protected-route'
import { useAppDispatch } from '../hooks'
import ErrorPage from '../pages/error-page'
import FeedOrders from '../pages/feed-orders'
import ForgotPassword from '../pages/forgot-password'
import Home from '../pages/home'
import Ingredient from '../pages/ingredient'
import Layout from '../pages/layout'
import Login from '../pages/login'
import Order from '../pages/order'
import Profile from '../pages/profile'
import ProfileOrders from '../pages/profile-orders'
import ProfileUser from '../pages/profile-user'
import Register from '../pages/register'
import ResetPassword from '../pages/reset-password'
import { fetchIngredients } from '../redux/ingredients/actions'
import { fetchCheckUser } from '../redux/user/actions'

function App() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const location = useLocation()
  const background = location.state && location.state.background

  React.useEffect(() => {
    dispatch(fetchCheckUser())
    dispatch(fetchIngredients())
  }, [dispatch])

  const handleCLoseModal = () => {
    navigate(-1)
  }
  const ingredientModal = (
    <Modal onClose={handleCLoseModal}>
      <IngredientDetails />
    </Modal>
  )
  const orderModal = (
    <Modal onClose={handleCLoseModal}>
      <OrderModal />
    </Modal>
  )

  return (
    <>
      <Routes location={background || location}>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/ingredients/:id' element={<Ingredient />} />
          <Route path='/feed' element={<FeedOrders />} />
          <Route path='/feed/:number' element={<Order />} />
          <Route path='/profile' element={<OnlyAuth element={<Profile />} />}>
            <Route index element={<OnlyAuth element={<ProfileUser />} />} />
            <Route path='/profile/order' element={<OnlyAuth element={<ProfileOrders />} />} />
          </Route>
          <Route path='/profile/order/:number' element={<OnlyAuth element={<Order />} />} />
          <Route path='/register' element={<OnlyUnAuth element={<Register />} />} />
          <Route path='/login' element={<OnlyUnAuth element={<Login />} />} />
          <Route path='/forgot-password' element={<OnlyUnAuth element={<ForgotPassword />} />} />
          <Route path='/reset-password' element={<OnlyUnAuth element={<ResetPassword />} />} />
          <Route path='/*' element={<ErrorPage />} />
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route path='/feed/:number' element={orderModal} />
          <Route path='/profile/order/:number' element={orderModal} />
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
