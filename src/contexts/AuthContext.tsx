//import { Sign } from "crypto";
import { createContext, ReactNode,useState,useEffect } from "react";
import {destroyCookie,setCookie,parseCookies} from 'nookies'
import  Router  from 'next/router'
import {api} from '../services/apiClient'
import {toast} from 'react-toastify'

type AuthContextData = {
    user: UserProps | null;
    isAuthenticated : boolean;
    signIn: (credentials:SignInProps) => Promise <void>;
    signOut: () => void
    signUp: (credentials: SignUpProps) => Promise <void>
}

type UserProps = {
    id:string;
    name:string;
    email:string;
}
type SignInProps = {
    email:string;
    password:string;
}

type AuthProviderProps = {
    children:ReactNode;
}

type SignUpProps = {
    name:string;
    email:string;
    password:string;
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut(){
    try{
        destroyCookie(undefined,'@nextauth.token');
        Router.push('/')

    }catch{
        console.log("erro ao deslogar")
    }
}


export function AuthProvider({children}: AuthProviderProps){

    const [user, setUser] = useState <UserProps | null>(null)
    const isAuthenticated = !!user; //convertar a variavel em boolean

    useEffect(()=>{

        //tentar pegar token no cookis
        const {'@nextauth.token':token} = parseCookies();

        if(token){

            api.get('/me').then(response =>{
                const {id,name,email} = response.data;

                setUser({
                    id,
                    name,
                    email
                })

            })
            .catch(()=>{
                //se deu erro deslogamo o user
                signOut();
            })

        }




    },[])

    async function signIn({email,password}:SignInProps){
        try{
            const response = await api.post('/session',{
                email,
                password
            })
         //   console.log(response.data)

         const {id,name,token} = response.data

         setCookie(undefined,'@nextauth.token',token,{
            maxAge:60*60*24*30, //expirar em um mês
            path:"/" //quais caminhos terao acesso ao cookie
         })

         setUser({
            id,name,email
         })

         //passar para as próximas requisições nosso token
         api.defaults.headers['Authorization'] = `Bearer ${token}`

         toast.success('Logado com sucesso!')

         //redirecionar o user paraa dash

         Router.push('/dashboard')

        }catch(err){
            console.log("erro ao accessar: " +err)
            toast.error("Erro ao acessar")

        }
    }

    async function signUp({name,email,password}: SignUpProps){

        try{
            const response = api.post('/users',{
                name,
                email,
                password
            })

            toast.success("Conta criado com sucesso")

            console.log("cadastrado com sucesso!")
            Router.push('/');

        }catch(err){
            toast.error("Erro ao cadastrar!")
            console.log("erro ao cadastrar ", err)

        }

        console.log(name)


    }

    return (
        <AuthContext.Provider value={{user, isAuthenticated,signIn,signOut,signUp}}>
            {children}
        </AuthContext.Provider>
    )
}