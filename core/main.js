WScript.StdOut.WriteLine("Welcome to WSH Password Generator!");
WScript.StdOut.WriteLine("Select password generation type (press key):");

createUserSelectBox("1 - Simple", "2 - Medium", "3 - Advanced");
handleStepChoice("Type");
showResult();