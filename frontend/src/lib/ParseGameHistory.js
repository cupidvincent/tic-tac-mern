export const ParseHistory = (data) => {
    const parsed = data
        .filter(fil => fil.games.length !== 0)
        .map((d, index) => {
            const rounds = d.games.length
            const mode = `${d.mode}/${d.mode}`;
            const x_score = d.games.filter((scoring) => scoring.winner === 'X').length
            const o_score = d.games.filter((scoring) => scoring.winner === 'O').length
            const winner = x_score === o_score ? 'DRAW' : x_score > o_score ? 'X' : 'O'
            const score =  `${x_score}/${o_score}` 
            return {
                winner,
                rounds,
                score,
                mode
            }
        })

        return parsed;
}