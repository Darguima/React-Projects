export default (text, cursor) => {
    // When are selected several chars
    if (cursor.selectionStart !== cursor.selectionEnd){

        if (cursor.selectionStart === 0){
            text = [
                ...(text.slice(0, cursor.selectionStart)),
                "> ",
                ...(text.slice(cursor.selectionStart, cursor.selectionEnd)),
                "\n\n",
                ...(text.slice(cursor.selectionEnd))
            ]
        }

        else {
            text = [
                ...(text.slice(0, cursor.selectionStart)),
                "\n\n> ",
                ...(text.slice(cursor.selectionStart, cursor.selectionEnd)),
                "\n\n",
                ...(text.slice(cursor.selectionEnd))
            ]
        }
    }

    else{

        let cursorPosition = cursor.selectionStart

        while (text[cursorPosition] !== "\n" && cursorPosition > 0){
            cursorPosition -= 1
        }

        if (cursorPosition !== 0){

            text = [
                ...(text.slice(0, cursorPosition)),
                "\n\n> ",
                ...(text.slice(cursorPosition + 1 ))
            ]
        }

        else{
            text = [
                ...(text.slice(0, cursorPosition)),
                "> ",
                ...(text.slice(cursorPosition))
            ]
        }

        // Add "\n\n" on the word end
        cursorPosition = cursor.selectionEnd

        while (text[cursorPosition] !== "\n" && cursorPosition <= text.length){
            cursorPosition += 1
        }

        text = [
            ...(text.slice(0, cursorPosition)),
            "\n\n",
            ...(text.slice(cursorPosition + 1))
        ]
        //}
    }


    return text.join("")
}