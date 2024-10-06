// Lấy tổng điểm và số dư từ localStorage
let totalScore = localStorage.getItem('totalScore') ? parseInt(localStorage.getItem('totalScore')) : 0;
let balance = parseInt(document.getElementById("balance").innerText);
const betAmount = 2; // Cố định số tiền cược là 2 GJ
let selectedBet = null; // Lưu loại cược đã chọn

// Cập nhật hiển thị
updateDisplay();

// Thiết lập sự kiện cho nút lắc xúc xắc
document.getElementById("rollDiceButton").addEventListener("click", rollDice);

// Thiết lập sự kiện cho các nút cược
document.getElementById("taiButton").addEventListener("click", () => { placeBet('tai'); });
document.getElementById("xiuButton").addEventListener("click", () => { placeBet('xiu'); });

// Hàm lắc xúc xắc
function rollDice() {
    if (!selectedBet) {
        alert("Bạn phải chọn Tài hoặc Xỉu trước khi lắc xúc xắc!");
        return;
    }

    if (betAmount > balance) {
        alert("Số tiền cược không đủ!");
        return;
    }

    const diceImages = [
        'https://img.icons8.com/?size=100&id=o1dGziQOijg4&format=png&color=000000',
        'https://img.icons8.com/?size=100&id=Fwcx5mpkWd8P&format=png&color=000000',
        'https://img.icons8.com/?size=100&id=q4ul9MoiyRtB&format=png&color=000000',
        'https://img.icons8.com/?size=100&id=ByJ6Sp3X3_cv&format=png&color=000000',
        'https://img.icons8.com/?size=100&id=5iWV5u7ve3PJ&format=png&color=000000',
        'https://img.icons8.com/?size=100&id=sL5WaT_mFUmK&format=png&color=000000'
    ]; // Liên kết hình ảnh xúc xắc

    const diceElements = [document.getElementById("dice1"), document.getElementById("dice2"), document.getElementById("dice3")];
    let rollTimes = 10; // Số lần quay

    // Bắt đầu hiệu ứng rung lắc
    diceElements.forEach(dice => {
        dice.style.animation = "shake 0.1s linear infinite"; // Bắt đầu hiệu ứng
    });

    // Hiệu ứng quay xúc xắc
    const spinInterval = setInterval(() => {
        diceElements.forEach(dice => {
            const randomIndex = Math.floor(Math.random() * diceImages.length);
            dice.src = diceImages[randomIndex]; // Cập nhật hình ảnh xúc xắc
        });
    }, 100); // Thay đổi hình ảnh mỗi 100ms

    // Dừng quay sau một khoảng thời gian và tính kết quả
    setTimeout(() => {
        clearInterval(spinInterval);

        // Dừng hiệu ứng rung lắc
        diceElements.forEach(dice => {
            dice.style.animation = ""; // Dừng hiệu ứng
        });

        // Tạo số ngẫu nhiên cho xúc xắc
        const rolledNumbers = diceElements.map(() => Math.floor(Math.random() * 6) + 1);
        const sum = rolledNumbers.reduce((a, b) => a + b, 0); // Tính tổng số

        // Hiển thị kết quả
        for (let i = 0; i < diceElements.length; i++) {
            diceElements[i].src = diceImages[rolledNumbers[i] - 1]; // Hiển thị kết quả cuối cùng
        }

        document.getElementById("resultMessage").innerText = `Tổng: ${sum}`;

        // Kiểm tra cược
        if (selectedBet === 'tai' && sum >= 11 && sum <= 18) {
            document.getElementById("resultMessage").innerText += " Bạn thắng Tài!";
            balance += betAmount; // Cộng điểm
            totalScore += betAmount; // Cộng tổng điểm
        } else if (selectedBet === 'xiu' && sum >= 3 && sum <= 10) {
            document.getElementById("resultMessage").innerText += " Bạn thắng Xỉu!";
            balance += betAmount; // Cộng điểm
            totalScore += betAmount; // Cộng tổng điểm
        } else {
            document.getElementById("resultMessage").innerText += " Bạn thua!";
            balance -= betAmount; // Trừ điểm
            totalScore -= betAmount; // Trừ tổng điểm
        }

        // Cập nhật hiển thị
        updateStorage(); // Cập nhật localStorage
        updateDisplay(); // Cập nhật hiển thị
    }, rollTimes * 100); // Thời gian quay
}

// Hàm cược
function placeBet(type) {
    selectedBet = type; // Lưu loại cược đã chọn
    document.getElementById("resultMessage").innerText = `Bạn đã đặt cược ${betAmount} GJ cho ${type}.`;
}

// Cập nhật hiển thị tổng điểm và số dư
function updateDisplay() {
    document.getElementById("balance").innerText = balance;
    document.getElementById("totalScore").innerText = totalScore;
}

// Cập nhật localStorage
function updateStorage() {
    localStorage.setItem('totalScore', totalScore);
    localStorage.setItem('balance', balance);
}
