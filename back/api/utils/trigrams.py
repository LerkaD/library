from typing import Set
#generate trigramms from min to max symbols
def generate_trigrams(text:str, min_n:int=1, max_n:int=3) -> Set[str]:
    text = text.lower().replace(" ", "")
    ngrams = set()
    for n in range(min_n, max_n + 1):
        for i in range(len(text) - n + 1):
            ngrams.add(text[i:i+n])
    return ngrams