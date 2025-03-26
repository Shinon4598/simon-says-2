import { useEffect, useState } from "preact/hooks";

export default function Score({score}) {
    const [bestScore, setBestScore] = useState(0);
    useEffect(() => {
        if (!localStorage.getItem('bestScore')) {
            localStorage.setItem('bestScore', 0);
        }
        if(score > localStorage.getItem('bestScore')) {
            localStorage.setItem('bestScore', score);
        }
        setBestScore(localStorage.getItem('bestScore'));
    }, [score]);

    return (
        <div className='score'>
            <h2>Score: {score}</h2>
            <h3>Best Score {bestScore}</h3>
        </div>
    )
}