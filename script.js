function drawWheel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2; // 修正為 / 2
    const radius = canvas.width / 2 - 10;
    const numSegments = selectedGifts.length;
    const segmentAngle = numSegments > 0 ? (2 * Math.PI) / numSegments : 0;

    if (numSegments === 0) {
        ctx.fillStyle = "#ccc";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#333";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.fillText("請選擇至少一個禮物", centerX, centerY);
        return;
    }

    for (let i = 0; i < numSegments; i++) {
        const startAngle = segmentAngle * i;
        const endAngle = segmentAngle * (i + 1);
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.fillStyle = `hsl(${i * (360 / numSegments)}, 70%, 70%)`;
        ctx.fill();
        ctx.stroke();

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(startAngle + segmentAngle / 2);
        ctx.fillStyle = "#000";
        ctx.font = numSegments > 10 ? "12px Arial" : "16px Arial";
        ctx.textAlign = "right";
        ctx.fillText(selectedGifts[i].name + " " + selectedGifts[i].emoji, radius - 20, 10);
        ctx.restore();
    }

    ctx.beginPath();
    ctx.moveTo(centerX + radius, centerY);
    ctx.lineTo(centerX + radius - 20, centerY - 10);
    ctx.lineTo(centerX + radius - 20, centerY + 10);
    ctx.fillStyle = "#333";
    ctx.fill();
}
