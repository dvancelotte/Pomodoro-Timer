turn = "session"
status = "pause";
internal = null;
seconds = 0;
minutes = 0;


function changeTimer(kind,turnX){
    
    var displayKind;
    displayKind = parseInt(document.getElementById(kind).innerHTML);        
    
    if(status=="pause"){
        if(turnX == 0){
            displayKind --;
            if(displayKind<=0)
                displayKind =1;
        }
        else{
            displayKind ++;
            if(displayKind>99)
                displayKind = 99;
        }
        time = displayKind <= 9? '0'+displayKind:displayKind;
        
        document.getElementById(kind).innerHTML = time;  
        
        if(turn == kind)
            document.getElementById("time").innerHTML = time + ':00';
    }
    else if(status == "start"){
        alert("Please, stop the timer.")
    }
    else if(status == "stoped"){
        alert("The pomodoro timer was restart.");
        minutes = 0;
        seconds = 0;
        turn = "session";
        status = "pause";
        changeTimer(kind,turnX);
    }
}



$("#load").on("click", function(){
    
    if(status=="pause" || status == "stoped"){
        status = "start";
        if(minutes<=0 && seconds <=0)
            minutes = parseInt(document.getElementById(turn).innerHTML);
        
        document.getElementById("load").innerHTML = "PAUSE THE " + turn.toUpperCase();
        
        var start = setInterval(function(){
            
            if(status == "stoped"){
                clearInterval(start);
            }
            
            if(seconds==0){
                seconds = 59;
                minutes --;
            }else{
                seconds --;
            }

            if(minutes < 0){
                status="pause";
            }
            
            if(status=='pause'){
                if(turn == "break"){
                    clearInterval(start);
                    time = "00:00"
                    minutes = 0;
                    seconds = 0;
                    document.getElementById("load").innerHTML = "START";
                }
                else{
                    turn = "break";
                    status = "start";
                    minutes = parseInt(document.getElementById(turn).innerHTML); 
                    seconds = 0;
                }
            }
            else{

                time = minutes <= 9? '0'+minutes:minutes;
                time += ':';
                time +=  seconds <= 9? '0'+seconds: seconds;

                document.getElementById("time").innerHTML =  time;
            }
            
        },1000); 
    }
    else if(status=='start'){
        status = "stoped";
        document.getElementById("load").innerHTML = "CONTINUE THE " + turn.toUpperCase();
    }
    
});

