
function showAlert(stats) {
    console.log(stats.score)
    var message = prompt("Score: " + stats.score + "\nLevel: " + stats.level + "\nPlease enter your name:", "");
    if (message == null || message == "") {
        // TODO
    } else {
        sendScore(stats.score, stats.level, message)
        window.location.replace("scoreboard.php")
    }
}


function sendScore(score, level, name) {
    const request  = new XMLHttpRequest();
    const url='server.php';
    request.open("POST", url);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    // request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send("score=" + score + "&name=" + name + "&level=" + level);

    request.onreadystatechange = (e) => {
        console.log(request .responseText)
    }
}