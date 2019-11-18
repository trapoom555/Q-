import Home from './pages/Home.vue'
import QueueGlance from './pages/QueueGlance.vue'
import Gmail from './pages/Gmail'
import Regis from './pages/Regis'
import Login from './pages/Login'
import UIque from './pages/UIque'
import DrugPage from './pages/DrugPage'
import Notification from './pages/Notification'
const routes = [
    { path: '/', component: Home, name: "Home" },
    { path: '/QueueGlance', component: QueueGlance, name: "QueueGlance" },
    { path: '/Regis', component: Regis, name: "Regis"},
    { path: '/Gmail', component: Gmail, name: "Gmail"},
    { path: '/Login', component: Login, name: "Login"},
    { path: '/UIque', component: UIque, name: "UIque"},
    { path: '/DrugPage', component: DrugPage, name: "DrugPage"},
    { path: '/Notification', component: Notification, name: "Notification"}
]

export default routes;
