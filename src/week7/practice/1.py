def evaluate(U, S, t):
    return pow(t - sum([x * y for x, y in zip(U, S)]), 2)


def greedySubsetSum(U, S, t):
    best = evaluate(U, S, t)
    bestItem = -1
    for i in range(len(S)):
        S_ = S.copy()
        S_[i] = 1
        if evaluate(U, S_, t) < best:
            best = evaluate(U, S_, t)
            bestItem = i
    if bestItem == -1:
        return False
    S[bestItem] = 1
    return True


U = [2, 42, 52, 13, 17, 32, 23, 53, 12]
S = [0] * len(U)
t = 60

while greedySubsetSum(U, S, t):
    print([U[i] for i in range(len(S)) if S[i] == 1])
    print(evaluate(U, S, t))
