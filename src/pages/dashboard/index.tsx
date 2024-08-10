import {canSSRAuth} from '../../utils/canSSRAuth'
import Head from 'next/head'
import {Header} from '../../components/Header'
import { Orders} from '@/components/Orders'

export default function Dashboard(){
    return (
        <>
            <Head>
                <title>Painel</title>
            </Head>
            <Header/>
            <Orders />

        </>

    )
}
export const getServerSideProps = canSSRAuth (async(ctx)=>{
    
    return{
        props:{}
    }
})