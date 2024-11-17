import style from './style.module.css'
export default function Tooth({size, tooth}) {
    const isLarge = size === 'lg';
    const containerSize = isLarge ? 'h-[154px] w-[150px]' : 'h-[40px] w-[40px]';
    const topClass = isLarge ? style.largeTop : style.trapezoidTop;
    const bottomClass = isLarge ? style.largeBottom : style.trapezoidBottom;
    const leftClass = isLarge ? style.largeLeft : style.trapezoidLeft;
    const rightClass = isLarge ? style.largeRight : style.trapezoidRight;
    //console.log(tooth);

    return (
        <div className={`${containerSize} border-2 rounded mb-2`}>
            <div className={`${topClass} border-${tooth.top}`}></div>
            <div id="mid" className={`${isLarge ? 'h-[90px]' : 'h-[24px]'} flex items-center justify-between`}>
                <div className={`${leftClass} border-${tooth.left} ${isLarge ? 'h-[120px]' : 'h-[24px]'}`}></div>
                <div className={`${isLarge ? 'h-[60px] w-[60px]' : 'h-[16px] w-[16px]'} border-2 rounded bg-${tooth.mid}`}></div>
                <div className={`${rightClass} border-${tooth.right} ${isLarge ? 'h-[120px]' : 'h-[24px]'}`}></div>
            </div>
            <div className={`${bottomClass} border-${tooth.bottom}`}></div>
        </div>
    );
}
