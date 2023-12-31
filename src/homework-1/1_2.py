def inc(s):
    for i in range(len(s)):
        if s[i] == 0:
            s[i] = 1
            return s
        if s[i] == 1:
            s[i] = 0
    return []


U = [12, 3, 6, 24, 35, 11, 9]
Selector = [0] * len(U)
K = 26
while len(Selector) > 0:
    Selector = inc(Selector)
    if sum([x*y for x, y in zip(Selector, U)]) == K:
        print([x*y for x, y in zip(Selector, U)])
