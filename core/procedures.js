var counter = Number(),
    userData = Object(),
    collStore = {
        "Simple": {
            "Number": ['', '1','2','3','4','5','6','7','8','9','0'],
            "String": "abcdefghijklmnopqrstuvwxyz".split(""),
            "Symbol": "?!,.@#$%^&*()_+=-|`~/<>".split("")
        },
        "Medium": function(){
            return this.Simple.Number.concat(this.Simple.String).sort(shuffleArray);
        },
        "Advanced": function(){
            return this.Simple.Symbol.concat(this.Medium()).sort(shuffleArray)
        }
    };

function shuffleArray(){
    return 0.65 - Math.random();
}

function createUserSelectBox(opt1, opt2, opt3){
    counter = 0;
    while (counter < arguments.length) {
        WScript.StdOut.WriteLine(arguments[counter]);
        ++counter;
    }
}

function handleStepChoice(saveTo){
    userData[saveTo] = WScript.StdIn.ReadLine();
}

function showResult(){
        var correctChoice = function(){
            var result = true;
            if (userData.Type <1 || userData.Type >3) {
                result = false;
            }
            return result;
        };

    if (Boolean(correctChoice()) == true) {
        var fileSystemObject = new ActiveXObject("Scripting.FileSystemObject"),
            workFile = fileSystemObject.OpenTextFile("result.txt", 2, true),
            pwd = generatePassword();

        WScript.StdOut.WriteLine(pwd);
        WScript.StdOut.WriteLine("New password was successfully generated! Check 'result.txt' file in the current directory.");
        workFile.Write("New generated password is: ");
        workFile.Write(pwd);
    } else {
        WScript.StdOut.WriteLine("Incorrect choice, try again.");
    }
}

function randomize(x,y,z) {
    var num;
    do {
        num = parseInt(Math.random()*z);
        if (num >= x && num <= y) break;
    } while (true);
    return(num);
}

function generatePassword() {
    var pwd = String(),
        tempChar, pwdChar, j = 0, pwdLength = 8,tempPwd = Array(), initialCounter = randomize(30,80,100);
    for (var r = 0; r < initialCounter; r++) {
        if (userData.Type == 1) { tempChar = randomize(1,9,100); tempPwd[j] = collStore.Simple.Number[tempChar]; j++; }
        else if (userData.Type == 2) { tempChar = randomize(1,35,100); tempPwd[j] = collStore.Medium()[tempChar]; j++; }
        else if (userData.Type == 3) { tempChar = randomize(1,58,100); tempPwd[j] = collStore.Advanced()[tempChar]; j++; }
    }
    for (var i = 0; i < pwdLength; i++) {
        pwdChar = randomize(1,j-1,100);
        pwd+= tempPwd[pwdChar];
    }
    return pwd;
}