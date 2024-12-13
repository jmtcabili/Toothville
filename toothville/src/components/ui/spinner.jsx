import { LoaderCircle } from "lucide-react"

export default function Spinner({dim, isDarkBg}){
    dim = dim === undefined ? "20" : dim.toString();
    let border = "border-nav_blue"
    let borderTop = "border-t-nav_gray"
    if (isDarkBg){
        border = "border-white"
        borderTop = "border-t-nav_blue"
    }
    return(
        <>
        <div id="loader"
             className={`border-4 ${border} ${borderTop} rounded-full animate-spin`}
             style={{
                width: `${dim}px`,
                height: `${dim}px`,
             }}>
        </div>
        </>
    )
}
