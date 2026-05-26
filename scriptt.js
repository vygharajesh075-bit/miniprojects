function play(user){
    const choices=['rock','paper','scissor']
    const comp=choices[Math.floor(Math.random()*3)];
    let result="";
    if (user===comp){
        result="Its a tie";
    }
    else if(user=='rock'&&comp=='scissor'||user=='paper'&&comp=='rock'||user=='scissor'&&comp=='paper'){
        result="Ypu win";
    }
    else{
        result="You lose";
    }
    document.getElementById("result").innerText=result;
    document.getElementById("computer").innerText=`Computer choice is ${comp}`;

}