import { useState, useEffect } from "preact/hooks";
import { Router, create } from "crayon";
import preact from "crayon-preact";
import { GenString } from 'crayon-kit'

export type routerFunc = (nav: Router, selector: string) => void

export const useRouter = ( 
    cb: routerFunc,
    name: string = GenString.ofLength(5),
): [ Router, (el: HTMLElement) => void ] => {
    const [ ref, setRef ] = useState<HTMLElement | undefined>(undefined)
    const [ app, setApp ] = useState<Router | undefined>(undefined)

    useEffect(() => {
        if (app || !ref) {
            return
        }
        const selector = `.${name}`
        const router = create(name)
        router.use(preact.router(ref, name))
        cb(router, selector)
        router.load().then(
          () => setApp(router)
        )
        
        return () => router.destroy()
    }, [ ref ])

    return ([ app, setRef ] as any)
}