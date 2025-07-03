const gifts = [
    { name: "巧克力禮盒", emoji: "🍫" },
    { name: "鮮花花束", emoji: "💐" },
    { name: "香水", emoji: "🎁" },
    { name: "藍牙耳機", emoji: "🎧" },
    { name: "電影票", emoji: "🎬" },
    { name: "咖啡禮券", emoji: "☕" },
    { name: "毛絨公仔", emoji: "🧸" },
    { name: "手錶", emoji: "⌚" },
    { name: "書本", emoji: "📚" },
    { name: "蛋糕", emoji: "🎂" }
];

const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinButton = document.getElementById("spin-button");
const resultText = document.getElementById("result");

const numSegments = gifts.length;
const segmentAngle = (2 * Math.PI) / numSegments;
let currentAngle = 0;

function drawWheel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = canvas.width / 2 - 10;

    for (let i = 0; i < numSegments; i++) {
        const startAngle = segmentAngle * i;
        const endAngle = segmentAngle * (i + 1);
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.fillStyle = `hsl(${i * (360 / numSegments)}, 70%, 70%)`;
        ctx.fill();
        ctx.stroke();

        // 繪製禮物名稱和 emoji
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(startAngle + segmentAngle / 2);
        ctx.fillStyle = "#000";
        ctx.font = "16px Arial";
        ctx.textAlign = "right";
        ctx.fillText(gifts[i].name + " " + gifts[i].emoji, radius - 20, 10);
        ctx.restore();
    }

    // 繪製指針
    ctx.beginPath();
    ctx.moveTo(centerX + radius, centerY);
    ctx.lineTo(centerX + radius - 20, centerY - 10);
    ctx.lineTo(centerX + radius - 20, centerY + 10);
    ctx.fillStyle = "#333";
    ctx.fill();
}

function spinWheel() {
    spinButton.disabled = true;
    resultText.textContent = "轉盤中...";
    const randomSpins = Math.floor(Math.random() * 3) + 3; // 隨機轉 3-5 圈
    const randomAngle = Math.random() * 360;
    const totalRotation = randomSpins * 360 + randomAngle;

    let startTime = null;
    const duration = 3000; // 旋轉 3 秒

    function animate(time) {
        if (!startTime) startTime = time;
        const progress = (time - startTime) / duration;
        if (progress < 1) {
            currentAngle = progress * totalRotation * (Math.PI / 180);
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate(currentAngle);
            ctx.translate(-canvas.width / 2, -canvas.height / 2);
            drawWheel();
            ctx.restore();
            requestAnimationFrame(animate);
        } else {
            currentAngle = (totalRotation % 360) * (Math.PI / 180);
            drawWheel();
            const selectedIndex = Math.floor(((totalRotation % 360) / 360) * numSegments);
            const selectedGift = gifts[numSegments - 1 - (selectedIndex % numSegments)];
            resultText.textContent = `恭喜！你抽到 ${selectedGift.name} ${selectedGift.emoji}`;
            spinButton.disabled = false;
        }
    }
    requestAnimationFrame(animate);
}

drawWheel();
spinButton.addEventListener("click", spinWheel);
