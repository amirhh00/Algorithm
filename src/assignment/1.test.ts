import { SimulatedAnnealing } from './1'; // Adjust the import path accordingly

describe('SimulatedAnnealing', () => {
  it('should find a valid solution for the multi-way partitioning problem', () => {
    const numbers = [95, 92, 87, 85, 81, 77, 74, 72, 69, 66, 62, 60, 47, 34, 32, 30, 24, 19, 13, 1];
    const numPartitions = 4;

    const simulatedAnnealing = new SimulatedAnnealing(numbers, numPartitions);
    const bestSolution = simulatedAnnealing.findSolution();

    // Check that the solution has the correct number of partitions
    expect(bestSolution.length).toBe(numPartitions);

    // Check that all numbers are assigned to a partition and the partitions have approximately equal sums
    for (const partition of bestSolution) {
      const partitionSum = partition.reduce((sum, num) => sum + num, 0);
      expect(partition.length > 0).toBe(true); // Each partition should not be empty
      expect(partitionSum).toBeCloseTo(numbers.reduce((sum, num) => sum + num, 0) / numPartitions);
    }
  });
});
