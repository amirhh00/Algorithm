const S = [2, 42, 52, 13, 17, 32, 23, 53, 12];
const T = 60

function sum(arr: number[]): number {
    return arr.reduce((partialSum, a) => partialSum + a, 0);
}

function constructiveGreedySubsetSum(arr: number[], target: number): number[] {
    const currentSubset: number[] = [];
    const sortedArray = [...arr].sort((a, b) => a - b).reverse(); // sort desc

    for (let i = 0; i < arr.length; i++) {
        const num = sortedArray[i];
        if (sum(currentSubset) + num <= target) {
            currentSubset.push(num);
        }
    }
    if (sum(currentSubset) === target) {
        return currentSubset;
    } else {
        return [];
    }
}

const x = constructiveGreedySubsetSum(S, T);
console.log(x.length === 0 ? "not possible" : x);
