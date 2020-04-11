export default (text, cursor) => {
    // When are selected several chars
    if (cursor.selectionStart !== cursor.selectionEnd){

        text = [
            ...(text.slice(0, cursor.selectionStart)),
            "[",
            ...(text.slice(cursor.selectionStart, cursor.selectionEnd)),
            "](url)",
            ...(text.slice(cursor.selectionEnd))
        ]

    }

    // When is selected a place between two spaces
    else if (text[cursor.selectionStart - 1] === " " && text[cursor.selectionStart] === " "){

        text = [
            ...(text.slice(0, cursor.selectionStart)),
            "[](url)",
            ...(text.slice(cursor.selectionStart))
        ]

    }

    // When is selected the only last char of the word
    else if (text[cursor.selectionStart] === "\n" || text[cursor.selectionStart] === " "){
        
        var adaptedCursorPosition = cursor.selectionStart
        while (text[adaptedCursorPosition] === "\n" || text[adaptedCursorPosition] === " "){
            adaptedCursorPosition -= 1
        }

        // Add [ on the word start
        let cursorPosition = adaptedCursorPosition

        while (text[cursorPosition] !== " " && text[cursorPosition] !== "\n" && cursorPosition >= 0){
            cursorPosition -= 1
        }

        text = [
            ...(text.slice(0, cursorPosition + 1)),
            "[",
            ...(text.slice(cursorPosition + 1))
        
        ]
        text = text.join("")

        // Add ](url) on the word finish
        cursorPosition = adaptedCursorPosition

        while (text[cursorPosition] !== " " && text[cursorPosition] !== "\n" && cursorPosition <= text.length){
            cursorPosition += 1
        }

        text = [
            ...(text.slice(0, cursorPosition)),
            "](url)",
            ...(text.slice(cursorPosition))
        ]
    }

    // When is selected a char in the midlle of the word
    else{
        // Add [ on the word start
        let cursorPosition = cursor.selectionStart

        while (text[cursorPosition] !== " " && text[cursorPosition] !== "\n" && cursorPosition >= 0){
            cursorPosition -= 1
        }

        text = [
            ...(text.slice(0, cursorPosition + 1)),
            "[",
            ...(text.slice(cursorPosition + 1))
        
        ]

        // Add ](url) on the word end
        cursorPosition = cursor.selectionEnd

        while (text[cursorPosition] !== " " && text[cursorPosition] !== "\n" && cursorPosition <= text.length){
            cursorPosition += 1
        }

        text = [
            ...(text.slice(0, cursorPosition)),
            "](url)",
            ...(text.slice(cursorPosition))
        
        ]
    }

    return text.join("")
}