import Starter from '@/components/starter'
import Login from '@/components/Login'
import Register from '@/components/Register'
import ForgetPwd from '@/components/ForgetPwd'
import NotFound from '@/components/NotFound'
import Map from '@/components/Map'

// common component

// buyer
import Buyer from '@/components/buyer/Buyer'

// developer
import Developer from '@/components/developer/Developer'

// seller
import Seller from '@/components/seller/Seller'

// common
import Wallet from '@/components/common/Wallet'
import Setting from '@/components/common/Setting'

const routes = [
    {
      path: '/map',
      name: 'Map',
      component: Map
    },{
      path: '/login',
      name: 'Login',
      component: Login
    },{
      path: '/register',
      name: 'Register',
      component: Register
    },{
      path: '/forgetPwd',
      name: 'ForgetPwd',
      component: ForgetPwd
    },{
      path: '/',
      name: 'Starter',
      component: Starter,
      children: [
        // buyer routes
        {
          path: 'buyer',
          component: Buyer,
          name: 'Buyer'
        },
        
        // developer routes
        {
          path: 'developer',
          component: Developer,
          name: 'Developer'
        },
        
        // seller routes
        {
          path: 'seller',
          component: Seller,
          name: 'Seller'
        },

        // common routes
        {
          path: 'wallet',
          component: Wallet,
          name: 'Wallet'
        },{
          path: 'setting',
          component: Setting,
          name: 'Setting'
        }
      ]
    },{
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ]

  export default routes

