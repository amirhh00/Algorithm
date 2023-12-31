class TabuSearch {
    private tabuList: number[];
    private currentSolution: boolean[];
    private bestSolution: boolean[];
    private currentValue: number;
    private bestValue: number;
  
    constructor(private numbers: number[], private targetSum: number, private tabuSize = numbers.length / 2) {
      this.tabuList = [];
      this.currentSolution = new Array(numbers.length).fill(false);
      this.bestSolution = [...this.currentSolution];
      this.currentValue = Infinity;
      this.bestValue = Infinity;
    }
  
    public run(iterations = Number.MAX_SAFE_INTEGER): void {
      let iterationCount = 0;
  
      while (iterationCount < iterations && !this.isTerminationConditionMet()) {
        const neighborhoodSolutions = this.generateNeighborhoodSolutions();
        const selectedNeighborIndex = Math.floor(Math.random() * neighborhoodSolutions.length);
        const selectedNeighborSoln = neighborhoodSolutions[selectedNeighborIndex];
  
        if (!this.isTaboo(selectedNeighborSoln)) {
          // Evaluate the neighbor solution and update if it improves the value
          const neighborValueDiff =
            Math.abs(this.evaluateSubsetSum(selectedNeighborSoln) - this.targetSum) -
            Math.abs(this.currentValue - this.targetSum);
  
          if (neighborValueDiff <= 0 || Math.random() < Math.exp(-neighborValueDiff / iterationCount)) {
            // Accept the neighbor solution as the current solution
            [this.currentSolution, this.currentValue] =
              [selectedNeighborSoln.slice(), this.evaluateSubsetSum(selectedNeighborSoln)];
  
            // Check if it's better than previous solutions
            if (Math.abs(this.currentTargetDifference()) < Math.abs(this.bestTargetDifference())) {
              [this.bestSolution, , ] =
                [selectedNeighborSoln.slice(), this.currentValue, this.currentTargetDifference()];
            }
  
            // Update the Tabu list
            this.tabuList.push(selectedNeighborIndex);
            if (this.tabuList.length > this.tabuSize) {
              this.tabuList.shift();
            }
          }
        }
  
        iterationCount++;
      }
    }
  
    private generateNeighborhoodSolutions(): boolean[][] {
      const neighborhood = [];
  
      for (let i = 0; i < this.numbers.length; i++) {
        const neighborSolution = [...this.currentSolution];
        neighborSolution[i] = !neighborSolution[i];
        neighborhood.push(neighborSolution);
      }
  
      return neighborhood;
    }
  
    private isTaboo(solution: boolean[]): boolean {
      const solutionIndex = this.solutionToIndex(solution);
  
      return this.tabuList.includes(solutionIndex);
    }
  
    private solutionToIndex(solution: boolean[]): number {
      let index = 0;
  
      for (let i = solution.length - 1; i >= 0; i--) {
        if (solution[i]) {
          index += Math.pow(2, i);
        }
      }
  
      return index;
    }
  
    private evaluateSubsetSum(subset: boolean[]): number {
      let sum = 0;
  
      for (let i = subset.length - 1; i >= 0; i--) {
        if (subset[i]) {
          sum += this.numbers[i];
        }
      }
  
      return sum;
     } 
  
     private currentTargetDifference(): number { 
       return this.currentValue - this.targetSum;
     } 
  
     private bestTargetDifference(): number { 
       return this.bestValue - this.targetSum;
     } 
  
     private isTerminationConditionMet(): boolean { 
       // Set your termination condition here
       // For example, you can check if a certain value has been reached or after a certain number of iterations
  
       // In this example, we terminate when the target difference is zero
       return Math.abs(this.currentTargetDifference()) === Math.abs(this.bestTargetDifference());
     }
  }
  
  // Example usage:
  const numbers = [3,5,-4,8,11,-2];
  const targetSum = 6;
  
  const tabuSearch= new TabuSearch(numbers,targetSum);  
  tabuSearch.run();
  
  console.log("Best Solution:", tabuSearch.getBestSolution());
  console.log("Best Value:", tabuSearch.getBestValue());