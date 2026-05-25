function generatePassword() {
    let chars = "abcdefghijklmnopqrstuvwxyz";
    
    if (document.getElementById("uppercase").checked) {
        chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    if (document.getElementById("numbers").checked) {
        chars += "0123456789";
    }
    if (document.getElementById("symbols").checked) {
        chars += "!@#$%^&*()";
    }

    let password = "";
    for (let i = 0; i < 10; i++) {
        password += chars[Math.floor(Math.random() * chars.length)];
    }

    document.getElementById("password").value = password;
}

function copyPassword() {
    const pass = document.getElementById("password");
    pass.select();
    document.execCommand("copy");
    alert("Copied!");
}