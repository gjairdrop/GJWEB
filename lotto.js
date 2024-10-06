// Lấy tổng điểm và số lần chơi từ localStorage
let totalScore = localStorage.getItem('totalScore') ? parseInt(localStorage.getItem('totalScore')) : 0;
let remainingPlays = localStorage.getItem('remainingPlays') ? parseInt(localStorage.getItem('remainingPlays')) : 3;

// Cập nhật hiển thị
updateDisplay();

function playLotto() {
    if (remainingPlays <= 0) {
        alert("Bạn đã hết số lần chơi trong ngày!");
        return;
    }

    const userNumber = parseInt(document.getElementById("userNumber").value);

    if (isNaN(userNumber) || userNumber < 1 || userNumber > 10) {
        alert("Vui lòng chọn một số hợp lệ từ 1 đến 10.");
        return;
    }

    // Hiệu ứng quay số ngẫu nhiên
    let randomNumber = Math.floor(Math.random() * 10) + 1;
    let randomNumberDisplay = document.getElementById("randomNumberDisplay");
    randomNumberDisplay.style.opacity = 0;

    let spins = 10; // Số lần quay trước khi dừng
    const spinSound = document.getElementById("spinSound");
    spinSound.play(); // Phát âm thanh quay số

    let interval = setInterval(function() {
        randomNumber = Math.floor(Math.random() * 10) + 1;
        randomNumberDisplay.innerText = randomNumber;
        randomNumberDisplay.style.opacity = 1;
        spins--;

        if (spins === 0) {
            clearInterval(interval);
            spinSound.pause(); // Dừng âm thanh quay số
            spinSound.currentTime = 0; // Quay lại đầu âm thanh
            checkResult(userNumber, randomNumber);
        }
    }, 200); // Cứ sau 200ms, số sẽ thay đổi
}

function checkResult(userNumber, randomNumber) {
    const winSound = document.getElementById("winSound");
    const loseSound = document.getElementById("loseSound");

    const randomNumberDisplay = document.getElementById("randomNumberDisplay");
    if (userNumber === randomNumber) {
        totalScore += 3;
        document.getElementById("resultMessage").innerText = `Bạn đã thắng! Bạn nhận được 3 điểm.`;
        winSound.play(); // Phát âm thanh thắng
        randomNumberDisplay.classList.add("winning");
    } else {
        document.getElementById("resultMessage").innerText = `Bạn đã thua! Số bạn chọn: ${userNumber}, Số ngẫu nhiên: ${randomNumber}.`;
        loseSound.play(); // Phát âm thanh thua
        randomNumberDisplay.classList.add("losing");
    }

    remainingPlays--;
    if (remainingPlays <= 0) {
        document.getElementById("resultMessage").innerText += " Bạn không thể chơi lại hôm nay.";
        document.getElementById("playButton").disabled = true;
    }

    updateStorage();
    updateDisplay();

    // Xóa các lớp sau khi kết thúc
    setTimeout(() => {
        randomNumberDisplay.classList.remove("winning", "losing");
    }, 2000); // Sau 2 giây
}

function updateDisplay() {
    document.getElementById("totalScore").innerText = totalScore;
    document.getElementById("remainingPlays").innerText = remainingPlays;
}

function updateStorage() {
    localStorage.setItem('totalScore', totalScore);
    localStorage.setItem('remainingPlays', remainingPlays);
}

// Thiết lập sự kiện
document.getElementById("playButton").addEventListener("click", playLotto);
