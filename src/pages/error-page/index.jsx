import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useLocation, useNavigate } from 'react-router-dom'

const ErrorPage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className='wrapper'>
      <div className='content-route'>
        <h2 className='text_type_main-large text_color_error'>Not Found</h2>
        <p className='text text_type_main-medium mb-8'>
          The specified path does not exist:{' '}
          <span className='text_color_error'>...{location.pathname}</span>
        </p>
        <Button htmlType='button' onClick={() => navigate('/', { replace: true })}>
          Вернуться
        </Button>
      </div>
    </div>
  )
}

export default ErrorPage
