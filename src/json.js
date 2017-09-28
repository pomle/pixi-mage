export function prettify(j, d = "\t") {
    function repeat(str, i) {
        let b = '';
        while (i-- > 0) {
            b += str;
        }
        return b;
    }

    const l = j.length;
    let p = 0;
    let i = 0;
    let b = "";
    let n = 0;
    let c, q;

    while (p < l) {
        c = j[p]

        // Ignore all whitespace chars out of quotes.
        if (c === " " || c === "\n" || c === "\t") {
            p += 1
            continue;
        }

        // Start block adds newline, increments indentation size (i) and position (p)
        if (c === "{" || c === "[") {
            b += repeat("\n", n) + repeat(d, i * n);
            i += 1;
            b += c + "\n" + repeat(d, i);
            p += 1;
            n = 0;
            continue;
        }

        // If we find a quote, buffer chars until next quote.
        if (c === `"` || c === `'`) {
            // Store start quote.
            q = c

            while (c !== q) {
                b += c;

                // If we just buffered a backslash, buffer following char blindly and increment p.
                if (c === "\\") {
                    p += 1;
                    b += j[p];
                }

                p += 1;
                c = j[p];
            }
        }

        // End block decrements indentation size, adds new line and idents.
        if (c === "}" || c === "]") {
            i -= 1;
            b += "\n" + repeat(d, i);
            n = 0;
        }

        // Buffer char.
        b += c;
        n = 1;

        // A comma generates a new line on current indentation level.
        if (c === ",") {
            b += repeat("\n", n) + repeat(d, i);
            n = 0;
        }

        // A colon should be appended by a space.
        else if (c === ":") {
            b += " "
        }

        p += 1
    }

    return b;
}
