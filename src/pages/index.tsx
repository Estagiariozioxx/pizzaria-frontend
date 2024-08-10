import Head from "next/head";

import {useContext, FormEvent, useState} from 'react'
import logoimg from '../../public/logo.svg'
import styles from "@/styles/home.module.scss";
import Image from "next/image";

import { Input } from '../components/ui/Input';
import { Button} from '../components/ui/Button'
import Link from 'next/link';
import {AuthContext} from '../contexts/AuthContext'
import {toast} from 'react-toastify'
import {canSSRGuest} from '../../src/utils/canSSRGuest'

export default function Home() {
  const {signIn} = useContext(AuthContext)

  const [email,setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)

  async function handleLogin(event: FormEvent){
    event.preventDefault();

    if(email == '' || password == '' ){
     // alert("preencha os dados")
     toast.warning("Preencha todos os campos")
      return

    }

    setLoading(true);


    console.log('teste');
    let data = {
      email, //leonarfsddo@hotmail.com
      password //123
    }
    await signIn(data)

    setLoading(false)

  }
  return (
    <>
      <Head>
        <title>
          Pizza - faça seu login
        </title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoimg} alt="logo pizzaria"/>

        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input placeholder="Digite seu email" type="text" value={email} onChange={(e)=> setEmail(e.target.value)}/>

            <Input placeholder="Digite sua senha" type="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>

            <Button type="submit" loading={loading}>Acessar</Button>
          </form>
          <Link href="/signup" className={styles.text}>
            Nao possui uma conta? Cadastre-se
          </Link>
        </div>
      </div>
    
    </>

  );
}


export const getServerSideProps= canSSRGuest(async ()=>{
  return {
    props:{}
  }
})
