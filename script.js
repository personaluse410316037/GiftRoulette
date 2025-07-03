const allGifts = [
    { name: "香水", emoji: "🎁" },
    { name: "化妝品禮盒", emoji: "💄" },
    { name: "玫瑰花束", emoji: "🌹" },
    { name: "巧克力禮盒", emoji: "🍫" },
    { name: "項鍊", emoji: "💍" },
    { name: "手提包", emoji: "👜" },
    { name: "絲巾", emoji: "🧣" },
    { name: "精美筆記本", emoji: "📓" },
    { name: "無線耳機", emoji: "🎧" },
    { name: "咖啡禮券", emoji: "☕" },
    { name: "電影票", emoji: "🎬" },
    { name: "保養品套裝", emoji: "🧴" },
    { name: "毛絨公仔", emoji: "🧸" },
    { name: "手錶", emoji: "⌚" },
    { name: "精裝小說", emoji: "📚" },
    { name: "蛋糕", emoji: "🎂" },
    { name: "瑜伽墊", emoji: "🧘‍♀️" },
    { name: "香薰蠟燭", emoji: "🕯️" },
    { name: "旅行化妝包", emoji: "🎒" },
    { name: "指甲油套裝", emoji: "💅" }
];

let selectedGifts = [...allGifts]; // 預設全選
const canvas = document.getElementById("wheel");
const ctx = canvas ? canvas.getContext("2d") : null;
const spinButton = document.getElementById("spin-button");
const resultText = document.getElementById("result");
const selectGiftsButton = document.getElementById("select-gifts-button");
const giftSelectionDiv = document.getElementById("gift-selection");
const giftForm = document.getElementById("gift-form");
const confirmGiftsButton = document.getElementById("confirm-gifts");

let currentAngle = 0;

function drawWheel() {
    if (!ctx) {
        console.error("Canvas context is null or unavailable");
        resultText.textContent = "錯誤：無法渲染輪盤，請檢查頁面！";
        return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
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

function spinWheel() {
    if (selectedGifts.length === 0) {
        resultText.textContent = "請先選擇禮物！";
        return;
    }
    if (!ctx) {
        console.error("Canvas context is unavailable during spin");
        resultText.textContent = "錯誤：無法啟動轉盤！";
        return;
    }
    console.log("Spin button clicked"); // 調試日誌
    resultText.textContent = "開始轉動..."; // 立即反饋
    spinButton.disabled = true;
    const randomSpins = Math.floor(Math.random() * 3) + 3; // 隨機轉 3-5 圈
    const randomAngle = Math.random() * 360;
    const totalRotation = randomSpins * 360 + randomAngle;

    let startTime = null;
    const duration = 3000; // 旋轉 3 秒

    function animate(time) {
        if (!startTime) startTime = time;
        const progress = Math.min((time - startTime) / duration, 1);
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
            const selectedIndex = Math.floor(((totalRotation % 360) / 360) * selectedGifts.length);
            const selectedGift = selectedGifts[selectedGifts.length - 1 - (selectedIndex % selectedGifts.length)];
            resultText.textContent = `恭喜！你抽到 ${selectedGift.name} ${selectedGift.emoji}`;
            spinButton.disabled = false;
        }
    }
    requestAnimationFrame(animate);
}

function populateGiftSelection() {
    giftForm.innerHTML = "";
    allGifts.forEach((gift, index) => {
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `gift-${index}`;
        checkbox.value = index;
        checkbox.checked = selectedGifts.includes(gift);
        checkbox.className = "gift-checkbox";
        const label = document.createElement("label");
        label.htmlFor = `gift-${index}`;
        label.textContent = `${gift.name} ${gift.emoji}`;
        giftForm.appendChild(checkbox);
        giftForm.appendChild(label);
        giftForm.appendChild(document.createElement("br"));
    });
}

selectGiftsButton.addEventListener("click", () => {
    giftSelectionDiv.style.display = "block";
    populateGiftSelection();
});

confirmGiftsButton.addEventListener("click", () => {
    const checkboxes = document.querySelectorAll(".gift-checkbox:checked");
    selectedGifts = Array.from(checkboxes).map(cb => allGifts[parseInt(cb.value)]);
    giftSelectionDiv.style.display = "none";
    spinButton.disabled = selectedGifts.length === 0;
    drawWheel();
    resultText.textContent = selectedGifts.length > 0 ? "請按轉動輪盤！" : "請選擇至少一個禮物！";
});

// 初始化
if (canvas && ctx) {
    drawWheel();
    spinButton.disabled = false; // 預設啟用，因為有所有禮物
    resultText.textContent = "請按轉動輪盤！";
} else {
    console.error("Canvas or context not found:", canvas, ctx);
    resultText.textContent = "錯誤：頁面初始化失敗！";
}
