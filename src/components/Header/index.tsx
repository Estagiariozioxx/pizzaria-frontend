import styles from './styles.module.scss'
import Link from 'next/link'
import {use, useContext} from 'react'

import {FiLogOut} from 'react-icons/fi'
import {AuthContext} from '../../contexts/AuthContext'

export function Header (){

    const{signOut} =  useContext(AuthContext)
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/dashboard">
                    <img src="/logo.svg" width={190} height={60} />
                </Link>
               

                <nav className={styles.menuNav}>
                    <Link href="/category">
                        Categoria
                    </Link>

                    <Link href="/product">
                        Caradapio
                    </Link>
                    <form onClick={signOut}>
                        <button type='submit'>
                            <FiLogOut color='#fff' size={24} />
                        </button>
                    </form>
                </nav>

            </div>
        </header>
    )

}