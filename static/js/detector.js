// ==========================================
// SMART EXAM DETECTOR
// ==========================================

let warning = 0;
let afk = 0;

let idleTime = 0;
const idleLimit = 10;

// Agar AFK tidak dihitung berulang
let afkDetected = false;

// Agar submit tidak dianggap pindah tab
let examFinished = false;


let status = document.getElementById("status");
let warningText = document.getElementById("warning");
let afkText = document.getElementById("afk");


// ==========================================
// UPDATE KE SERVER
// ==========================================

function sendData() {

    fetch("/update_detector", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            warning: warning,

            afk: afk

        })

    });

}


// ==========================================
// UPDATE TAMPILAN
// ==========================================

function refreshUI() {

    if(warningText){

        warningText.innerHTML = warning;

    }

    if(afkText){

        afkText.innerHTML = afk;

    }

}


// ==========================================
// PINDAH TAB
// ==========================================

document.addEventListener("visibilitychange", function () {


    // Abaikan jika ujian sudah selesai

    if(document.hidden && !examFinished){


        warning++;

        refreshUI();

        sendData();


        alert("⚠ Anda berpindah tab!");



        if(warning >= 3){


            alert(
                "🚫 Ujian dihentikan karena terlalu banyak berpindah tab."
            );


            examFinished = true;


            document.getElementById("examForm").submit();


        }


    }


});


// ==========================================
// RESET IDLE
// ==========================================

function resetIdle(){

    idleTime = 0;

    afkDetected = false;


    if(status){

        status.innerHTML = "ACTIVE";

        status.className =
        "badge bg-success badge-status";

    }

}


// ==========================================
// EVENT USER
// ==========================================

document.addEventListener(
    "mousemove",
    resetIdle
);

document.addEventListener(
    "keydown",
    resetIdle
);

document.addEventListener(
    "mousedown",
    resetIdle
);

document.addEventListener(
    "touchstart",
    resetIdle
);

document.addEventListener(
    "scroll",
    resetIdle
);


// ==========================================
// CEK AFK
// ==========================================

setInterval(function(){


    if(examFinished){

        return;

    }


    idleTime++;


    if(idleTime >= idleLimit && !afkDetected){


        afk++;

        afkDetected = true;


        refreshUI();

        sendData();


        if(status){

            status.innerHTML="AFK";

            status.className =
            "badge bg-danger badge-status";

        }


        alert("⚠ Anda terdeteksi AFK!");



        if(afk >= 3){


            alert(
                "🚫 Ujian dihentikan karena terlalu sering AFK."
            );


            examFinished = true;


            document.getElementById("examForm").submit();


        }


    }


},1000);



// ==========================================
// STOP DETECTOR SAAT SUBMIT MANUAL
// ==========================================

document.addEventListener(
"DOMContentLoaded",
function(){


    let form = document.getElementById("examForm");


    if(form){


        form.addEventListener(
        "submit",
        function(){


            examFinished = true;


        });


    }


});