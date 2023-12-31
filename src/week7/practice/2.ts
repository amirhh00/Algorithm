function evaluate(U: number[], S: number[], t: number): number {
    return Math.pow(t - U.reduce((sum, u, i) => sum + u * S[i], 0), 2);
}

function greedySubsetSum(U: number[], S: number[], t: number): boolean {
    let best = evaluate(U, S, t);
    let bestItem = -1;
    for (let i = 0; i < S.length; i++) {
        let S_ = [...S];
        S_[i] = 1;
        if (evaluate(U, S_, t) < best) {
            best = evaluate(U, S_, t);
            bestItem = i;
        }
    }
    if (bestItem === -1) {
        return false;
    }
    S[bestItem] = 1;
    return true;
}

let U = [2, 42, 52, 13, 17, 32, 23, 53, 12];
let S = Array(U.length).fill(0);
let t = 60;

while (greedySubsetSum(U, S, t)) {
    console.log(U.filter((_, i) => S[i] === 1));
    console.log(evaluate(U, S, t));
}