import {GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult} from 'next'
import {parseCookies,destroyCookie} from 'nookies'


//funcao para paginas que só pode acessar por visitantes sem estar logados
export function canSSRGuest<P> (fn: GetServerSideProps<P>){

    return async (ctx: GetServerSidePropsContext): Promise <GetServerSidePropsResult<P>>=>{
        const cookies = parseCookies(ctx);
        //se tentar acessar com um login ja salvo
        if(cookies['@nextauth.token']){
            return {
                redirect:{
                    destination:'/dashboard',
                    permanent:false,

                }
            }

        }




        return await fn(ctx);


    }

}