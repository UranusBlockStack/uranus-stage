import Starter from '@/components/starter'
import Login from '@/components/Login'
import Register from '@/components/Register'
import ForgetPwd from '@/components/ForgetPwd'
import NotFound from '@/components/NotFound'
import Map from '@/components/Map'

// common component

// seller
import Seller from '@/components/Seller'


const routes = [
    {
      path: '/map',
      name: 'Map',
      component: Map
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/forgetPwd',
      name: 'ForgetPwd',
      component: ForgetPwd
    },
    {
      path: '/',
      name: 'Starter',
      component: Starter,
      children: [
        {
          path: 'seller',
          component: Seller,
          name: 'Seller'
        }
      ]
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ]

  export default routes

