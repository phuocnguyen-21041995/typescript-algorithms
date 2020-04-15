import { print } from "../../app/util/output";

// of Rabin Karp Algorithm
// performance O(n) - worst case O(n * m)

const BASE: number = 256;

function search(
    pattern: string,
    text: string,
    primeNumber: number = 101,
): number[] {
    const results: number[] = [];
    const patternLen = pattern.length;
    const textLen = text.length;

    let i: number;
    let j: number;

    let patternHash = 0;
    let textHash = 0;
    let basePower = 1;

    // The value of basePower would be "pow(BASE, patternLen-1)%primeNumber"
    for (i = 0; i < patternLen - 1; i++) {
        basePower = (basePower * BASE) % primeNumber;
    }

    // Calculate the hash value of pattern and first
    // window of text
    for (i = 0; i < patternLen; i++) {
        patternHash = (BASE * patternHash + pattern.charCodeAt(i)) % primeNumber;
        textHash = (BASE * textHash + text.charCodeAt(i)) % primeNumber;
    }

    // Slide the pattern over text one by one
    for (i = 0; i <= textLen - patternLen; i++) {
        // Check the hash values of current window of text
        // and pattern. If the hash values match then only
        // check for characters on by one
        if (patternHash === textHash) {
            for (j = 0; j < patternLen; j++) {
                if (text.charCodeAt(i + j) !== pattern.charCodeAt(j)) {
                    break;
                }
            }

            // if patternHash == textHash and pattern[0...patternLen-1] = text[i, i+1, ...i+patternLen-1] 
            if (j === patternLen) {
                results.push(i);
            }
        }

        // Calculate hash value for next window of text: Remove
        // leading digit, add trailing digit
        if (i < textLen - patternLen) {
            textHash = (BASE * (textHash - text.charCodeAt(i) * basePower) + text.charCodeAt(i + patternLen)) % primeNumber;

            // We might get negative value of textHash, convert it
            // to positive
            if (textHash < 0) {
                textHash = (textHash + primeNumber);
            }
        }
    }

    return results;
}

export default function main(): void {
    const txt = "GEEKS FOR GEEKS";
    const pat = "GEEK";
    const q = 101;
    const result = search(pat, txt, q);

    print("");
    print(`Search text: "${txt}"`);
    print(`Search for: ${pat}`);
    print(`Positions found: ${result}`);
}