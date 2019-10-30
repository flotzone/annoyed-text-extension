let logic = false;

chrome.storage.local.get('WritingIsActive', function(data) {
    if (data.WritingIsActive === true) {
        document.querySelector('button').className = 'btn btn-success';
        document.querySelector('button').textContent = "Activated";
    } else {
        document.querySelector('button').className = 'btn btn-danger';
        document.querySelector('button').textContent = "Inactive";
    }
    logic = data.WritingIsActive;
});

document.addEventListener('click', function (evt) {
   if (evt.target.tagName === 'BUTTON') {
        let btnText = evt.target.textContent.toLowerCase();
        if (btnText.includes('inactive')) {
            evt.target.textContent = "Active";
            evt.target.className = 'btn btn-success';
            chrome.storage.local.set({'WritingIsActive' : true});
            logic = true;
        } else {
            evt.target.textContent = "Inactive";
            evt.target.className = 'btn btn-danger';
            chrome.storage.local.set({'WritingIsActive' : false});
            logic = false;
        }
   }
});

document.querySelector('a').addEventListener('click', function() {
    // redirect to github
    chrome.tabs.create({url: this.href});
});

document.querySelector('input').addEventListener('click', function() {
    /* Get the text field */
    let copyText = this;

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/

    /* Copy the text inside the text field */
    document.execCommand("copy");
});


function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}

chrome.storage.onChanged.addListener(function(changes) {
    for (var key in changes) {
        if (changes.WritingIsActive) {
            var storageChange = changes.WritingIsActive;
            if (!storageChange.oldValue) {
                logic = true;
            } else {
                logic = false;
            }
        }
    }
});

document.addEventListener('keydown', function(evt) {
    if (logic) {
        typeText(logic);
    }
});

function typeText(logic) {
    let j = 0;
    if (logic) {
        let text = document.querySelector('input') !== undefined ? document.querySelector('input').value : "";
        let myText = '';
        for (let i = 0; i <= text.length; i++) {
            let char = text.charAt(i);

            let letter = '';
            if (char.toUpperCase() !== char.toLowerCase() && isLetter(char) && logic) {
                letter = (j % 2 == 0) ? char.toUpperCase() : char.toLowerCase();
                j++;
            } else {
                letter = char;
                j = 0;
            }
            text[i] = char;
            myText += letter;
        }
        document.querySelector('input:focus').value = myText;
    }
}
