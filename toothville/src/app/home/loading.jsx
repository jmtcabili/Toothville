import Spinner from "@/components/ui/spinner"

export default function Loading(){
    return(
        <>
            <div id="container" className = "w-screen h-screen flex flex-col justify-center items-center">
                <Spinner dim="50"/>
                Loading homepage...
            </div>
        </>
    )
}