class SimulatedAnnealing {
  constructor(private numbers: number[], private numPartitions: number, private constraint?: (solution: number[][]) => boolean ) {}

  public findSolution(): number[][] {
    const initialSolution = this.generateRandomSolution();
    let currentSolution = initialSolution.slice();
    let bestSolution = initialSolution.slice();

    let temperature = 10.0;
    const coolingRate = 0.95;

    while (temperature > 1.0) {
      const newSolution = this.generateNeighborSolution(currentSolution);
      const currentObjective = this.calculateObjective(currentSolution);
      const newObjective = this.calculateObjective(newSolution);

      if (this.acceptSolution(currentObjective, newObjective, temperature)) {
        currentSolution = newSolution.slice();
      }

      if (newObjective < this.calculateObjective(bestSolution)) {
        bestSolution = newSolution.slice();
      }

      temperature *= coolingRate;
    }

    return bestSolution;
  }

  private generateRandomSolution(): number[][] {
    const randomSolution: number[][] = Array.from({
      length: this.numPartitions,
    }, () => []);

    for (const num of this.numbers) {
      const randomPartitionIndex = Math.floor(
        Math.random() * this.numPartitions,
      );
      randomSolution[randomPartitionIndex].push(num);
    }

    return randomSolution;
  }

  private generateNeighborSolution(solution: number[][]): number[][] {
    // Swap a random element between two partitions to generate a neighbor solution
    const neighborSolution = solution.map((partition) => partition.slice());

    const randomPartition1 = Math.floor(Math.random() * this.numPartitions);
    const randomPartition2 = Math.floor(Math.random() * this.numPartitions);

    if (neighborSolution[randomPartition1].length > 0) {
      const randomIndex = Math.floor(
        Math.random() * neighborSolution[randomPartition1].length,
      );
      const elementToMove =
        neighborSolution[randomPartition1].splice(randomIndex, 1)[0];
      neighborSolution[randomPartition2].push(elementToMove);
    }

    return neighborSolution;
  }

  private calculateObjective(solution: number[][]): number {
    // Calculate the objective value as the maximum difference between the sums of partitions
    const partitionSums = solution.map((partition) =>
      partition.reduce((sum, num) => sum + num, 0)
    );
    const maxDifference = Math.max(...partitionSums) -
      Math.min(...partitionSums);

    return maxDifference;
  }

  private acceptSolution(
    currentObjective: number,
    newObjective: number,
    temperature: number,
  ): boolean {
    // Accept if better or with a certain probability based on temperature
    if (newObjective < currentObjective) {
      return true;
    }

    const probability = Math.exp(
      (currentObjective - newObjective) / temperature,
    );
    return Math.random() < probability;
  }
}

// const numbers = [
//   95,
//   92,
//   87,
//   85,
//   81,
//   77,
//   74,
//   72,
//   69,
//   66,
//   62,
//   60,
//   47,
//   34,
//   32,
//   30,
//   24,
//   19,
//   13,
//   1,
// ];
// const numPartitions = 4;
const numbers = [ 2,4,6,8,10
];
const numPartitions = 3;

const simulatedAnnealing = new SimulatedAnnealing(numbers, numPartitions);
const bestSolution = simulatedAnnealing.findSolution();

console.log("Best Solution:", bestSolution);

export { SimulatedAnnealing };
