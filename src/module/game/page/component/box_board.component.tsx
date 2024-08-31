import { motion } from 'framer-motion';

export default function BoxBoardComponent(
    {
        className,
        value,
        onClick,
        isWinner,
    }: {
        className: string
        value: string
        onClick: () => void
        isWinner: boolean
    }) {
    const winnerScale = isWinner ? 1.2 : 1;
    const renderValue = () => {
        if (value === "X") {
            return (
                <motion.img
                    className="ease-in"
                    src="../assets/x.png"
                    alt="X"
                    initial={{ scale: 0 }} 
                    animate={{ scale: winnerScale }} 
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }} 
                />
            );
        }
        if (value === "O") {
            return (
                <motion.img
                    className="ease-in"
                    src="../assets/small-o.png"
                    alt="O"
                    initial={{ scale: 0 }}
                    animate={{ scale: winnerScale }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                />
            )
        }
        return null;
    };

    return (
        <div className={className} onClick={onClick}>
            {renderValue()}
        </div>
    );
}