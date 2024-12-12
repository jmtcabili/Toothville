import { LoaderCircle } from "lucide-react"

export default function Spinner({dim}){
    dim = dim === undefined ? "20" : dim.toString();
    return(
        <>
        <div id="loader"
             className={`border-4 border-nav_blue border-t-nav_gray rounded-full animate-spin`}
             style={{
                width: `${dim}px`,
                height: `${dim}px`,
             }}>
        </div>
        </>
    )
}
