import styles from './nav.module.css'
import { Link, Outlet } from 'react-router-dom'

export default function Header(){
    return (
        <>
            <nav className={styles.navbar}>
            <h1 className={styles.marginLeft}>BuyBusy App</h1>
            <div className={styles.linkcontainer}>
                <div><Link to='/'><i class="fa-solid fa-house fa-xl" style={{color: '#000000'}}></i></Link></div> 
                <div><Link to='/signup'><i class="fa-solid fa-user-plus fa-xl" style={{color: '#000000'}}></i></Link></div>
                <div><Link to='/signin'><i class="fa-solid fa-right-to-bracket fa-xl" style={{color: '#000000'}}></i></Link></div>
            </div>

            </nav>
            <Outlet/>
        </>
        
    )
}