function showTime() {
    const date = new Date();
    return date.getHours() + "Hrs:" + date.getMinutes() + "Mins:" + date.getSeconds() + "Secs";
}

function showSessionExpire() {
    console.log("Activity-B: Session expired at " + showTime());
}

console.log("Activity-A: Triggering Activity-B at " + showTime());
setTimeout(showSessionExpire, 5000);
console.log("Activity-A: Triggered Activity-B at " + showTime() + " wil expire after 5 seconds");