document.addEventListener("DOMContentLoaded", function () {

    let ctx = null
    const startButton = document.getElementById('start')
    const resetButton = document.getElementById('reset')
    const incrementMultiplier = document.getElementById('incrementMultiplier')
    const autoPlay = document.getElementById('auto')
    const canvas = document.getElementById('canvas')
    ctx = canvas.getContext("2d")
    ctx.imageSmoothingEnabled = false;
    const screenSize = window.screen.height / 2 + 340;
    canvas.height = screenSize
    canvas.width = screenSize
    const radius = screenSize / 2 - 20
    const originPosX = screenSize / 2
    const originPosY = screenSize / 2
    let intervalId = null
    let points = []
    let numberPointsCircle = null
    let multiplier = null
    drawCircle()


    function resetCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        drawCircle()
    }

    function drawPoints() {
        points = []
        for (let i = 0; i < numberPointsCircle; i++) {
            let pointPosX = originPosX + Math.cos(i * (2 * Math.PI / numberPointsCircle)) * radius
            let pointPosY = originPosY + Math.sin(i * (2 * Math.PI / numberPointsCircle)) * radius
            ctx.beginPath()
            ctx.arc(pointPosX, pointPosY, 0, 0, 2 * Math.PI)
            ctx.fillStyle = 'white'
            ctx.fill()
            points.push({
                'x': pointPosX,
                'y': pointPosY
            })
        }
    }

    function drawLines() {
        // Draw lines
        let index = 0
        for (let i = 0; i < points.length; i++) {
            index = i * multiplier
            ctx.beginPath()
            ctx.moveTo(points[i].x, points[i].y)
            if (index >= points.length)
                index %= points.length
            ctx.lineTo(points[index].x, points[index].y)
            ctx.strokeStyle = 'white'
            ctx.stroke()
        }
    }

    function process() {
        // Draw points in the circle
        drawPoints()
        drawLines()
    }

    function refresh() {
        clearInterval(intervalId)
        resetCanvas()
    }

    startButton.addEventListener('click', function () {
        numberPointsCircle = document.getElementById('pointsInput').value
        multiplier = document.getElementById('multiplierInput').value
        let maxIterations = parseInt(document.getElementById('maxIterations').value)
        let timer = document.getElementById('timer').value
        let count = 0
        intervalId = setInterval(() => {
            resetCanvas()
            process()
            numberPointsCircle++
            count++
            console.log("Count:", count); // Check count in console for debugging
            if (count === maxIterations)
                clearInterval(intervalId)
        }, timer)

    })

    resetButton.addEventListener('click', function () {
        multiplier = 2
        numberPointsCircle = 10
        refresh()
    })

    incrementMultiplier.addEventListener('click', function () {
        multiplier++
    })

    autoPlay.addEventListener('click', function () {
        refresh()
        numberPointsCircle = 300
        intervalId = setInterval(() => {
            resetCanvas()
            process()
            multiplier++
        }, 250)
    })

    function drawCircle() {
        ctx.beginPath();
        ctx.arc(originPosX, originPosY, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = 'white';
        ctx.stroke()
    }
})

