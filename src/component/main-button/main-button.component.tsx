export default function MainButtonComponent(
    {
        title = "Start Game",
        type = "main",
        onClick
    }: {
        title: string,
        type?: "main" | "secondary",
        onClick?: () => void
    }
) {

    const color = type === "main" ? "bg-yellow-400" : "bg-white-400";
    const hover = type === "main" ? "hover:bg-yellow-500" : "hover:bg-white-500";

    return (
        <button
            onClick={onClick}
            className={`
                ${color} 
                text-white 
                font-bold 
                py-2 
                px-4 
                h-12
                titanOneFont
                text-xl
                rounded-full
                stroke-text-1
                border-b-4 border-black border-l-4 border-r-2 border-t-2

                ${hover}
                active:bg-yellow-600 
                active:border-b-2
                active:border-l-2
                active:border-r-4
                active:border-t-4
            `}
        >
            {title}
        </button>
    )
}
