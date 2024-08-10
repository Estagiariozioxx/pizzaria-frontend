import { useState, FormEvent, useContext } from 'react';
import Image from "next/image";
import Head from "next/head";
import Link from 'next/link';

import logoimg from '../../../public/logo.svg'
import styles from "../../styles/home.module.scss";

import { Input } from '../../components/ui/Input';
import { Button} from '../../components/ui/Button';

import { AuthContext } from '@/contexts/AuthContext';


export default function Singup() {
  

  const {signUp} = useContext(AuthContext)



  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading,setLoading] = useState(false)

  async function handleSignup(event: FormEvent){
    event.preventDefault();

    if(name == '' || email =='' || password ==''){
      alert('prrencha todos os campos')
      return
    }
    setLoading(true)

    let data = {
      name,
      email,
      password
    }

    await signUp(data)

    setLoading(false)

  }
  return (
    <>
    <Head>
      <title>
        Cadastro
      </title>
    </Head>
      <div className={styles.containerCenter}>
        <Image src={logoimg} alt="logo pizzaria"/>

        <div className={styles.login}>
            <h1>Criando sua conta</h1>
          <form onSubmit={handleSignup}>
            <Input placeholder="Digite seu nome"  value={name} onChange={(e)=>setName(e.target.value)} type="text"/>
            <Input placeholder="Digite seu email" value={email} onChange={(e)=>setEmail(e.target.value)} type="text"/>
            <Input placeholder="Digite sua senha" value={password} onChange={(e)=>setPassword(e.target.value)} type="password"/>
            <Button type="submit" loading={loading}>cadastrar</Button>
          </form>
          <Link href="/" className={styles.text}>
            Já possui uma conta? faça o login
          </Link>
          
        </div>

      </div>
    
    </>

  );
}
