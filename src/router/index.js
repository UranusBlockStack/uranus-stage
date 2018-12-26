import Starter from '@/components/starter'
import Login from '@/components/Login'
import Register from '@/components/Register'
import ForgetPwd from '@/components/ForgetPwd'
import NotFound from '@/components/NotFound'
import Map from '@/components/Map'

// common component

// buyer
import Buyer from '@/components/buyer/Buyer'
import ApplicationMarket from '@/components/buyer/ApplicationMarket'
import ApplicationRepository from '@/components/buyer/ApplicationRepository'
import AppRecord from '@/components/buyer/AppRecord'
import ResourceMarket from '@/components/buyer/ResourceMarket'

// developer
import Developer from '@/components/developer/Developer'

// seller
import Seller from '@/components/seller/Seller'

// common
import Wallet from '@/components/common/Wallet'
import Transfer from '@/components/common/Transfer'
import Setting from '@/components/common/Setting'

const routes = [
  {
    path: '/map',
    name: 'Map',
    component: Map
  }, {
    path: '/login',
    name: 'Login',
    component: Login
  }, {
    path: '/register',
    name: 'Register',
    component: Register
  }, {
    path: '/forgetPwd',
    name: 'ForgetPwd',
    component: ForgetPwd
  }, {
    path: '/',
    name: 'Starter',
    component: Starter,
    children: [
        // buyer routes
      {
        path: 'buyer',
        component: Buyer,
        name: 'Buyer'
      }, {
        path: 'applicationmarket',
        component: ApplicationMarket,
        name: 'ApplicationMarket'
      }, {
        path: 'applicationrepository',
        component: ApplicationRepository,
        name: 'ApplicationRepository'
      }, {
        path: 'apprecord',
        component: AppRecord,
        name: 'AppRecord'
      },{
        path: 'resourcemarket',
        component: ResourceMarket,
        name: 'ResourceMarket'
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
      }, {
        path: 'setting',
        component: Setting,
        name: 'Setting'
      }, {
        path: 'transfer',
        component: Transfer,
        name: 'Transfer'
      }
    ]
  }, {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }
]

export default routes
