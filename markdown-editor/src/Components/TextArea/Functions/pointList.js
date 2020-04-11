export default (text, cursor) => {

    // When are selected several chars
    if (cursor.selectionStart !== cursor.selectionEnd){

        text = [
            ...(text.slice(0, cursor.selectionStart)),
            "\n\n- ",
            ...(text.slice(cursor.selectionStart, cursor.selectionEnd)),
            "\n\n",
            ...(text.slice(cursor.selectionEnd + 1))
        ]

    }

    // When is selected a place between two spaces
    else if (text[cursor.selectionStart - 1] === " " && text[cursor.selectionStart] === " "){

        text = [
            ...(text.slice(0, cursor.selectionStart)),
            "\n\n- \n\n",
            ...(text.slice(cursor.selectionStart + 1))
        ]

    }

    // When is selected the only last char of the word
    else if (text[cursor.selectionStart] === "\n" || text[cursor.selectionStart] === " "){
        
        var adaptedCursorPosition = cursor.selectionStart
        while (text[adaptedCursorPosition] === "\n" || text[adaptedCursorPosition] === " "){
            adaptedCursorPosition -= 1
        }

        // Add "\n\n- " on the word start
        let cursorPosition = adaptedCursorPosition

        while (text[cursorPosition] !== " " && text[cursorPosition] !== "\n" && cursorPosition >= 0){
            cursorPosition -= 1
        }

        text = [
            ...(text.slice(0, cursorPosition)),
            "\n\n- ",
            ...(text.slice(cursorPosition + 1))
        ]

        text = text.join("")

        // Add "\n\n" on the word end
        cursorPosition = adaptedCursorPosition

        while (text[cursorPosition] !== " " && text[cursorPosition] !== "\n" && cursorPosition <= text.length){
            cursorPosition += 1
        }

        text = [
            ...(text.slice(0, cursorPosition)),
            "\n\n",
            ...(text.slice(cursorPosition + 1))
        ]
    }

    // When is selected a char in the midlle of the word
    else{
        // Add "\n\n- " on the word start
        let cursorPosition = cursor.selectionStart

        while (text[cursorPosition] !== " " && text[cursorPosition] !== "\n" && cursorPosition >= 0){
            cursorPosition -= 1
        }

        text = [
            ...(text.slice(0, cursorPosition)),
            "\n\n- ",
            ...(text.slice(cursorPosition + 1))
        ]

        // Add "\n\n" on the word end
        cursorPosition = cursor.selectionEnd

        while (text[cursorPosition] !== " " && text[cursorPosition] !== "\n" && cursorPosition <= text.length){
            cursorPosition += 1
        }

        text = [
            ...(text.slice(0, cursorPosition)),
            "\n\n",
            ...(text.slice(cursorPosition + 1))
        ]
    }


    return text.join("")
}