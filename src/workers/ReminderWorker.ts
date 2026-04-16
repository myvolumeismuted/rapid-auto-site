let isRunning = true

async function RemindTask() {
    console.log("hi")
}

setInterval(RemindTask, (1000 * 60 * 60) /** RUNS EVERY HOUR */)