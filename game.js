// Lấy tổng điểm từ localStorage nếu có, nếu không thì đặt là 0
let totalScore = localStorage.getItem('totalScore') ? parseInt(localStorage.getItem('totalScore')) : 0;
document.getElementById('totalScore').innerText = totalScore;

// Giới hạn số lần chơi mỗi ngày
let remainingPlays = localStorage.getItem('remainingPlays') ? parseInt(localStorage.getItem('remainingPlays')) : 3;
document.getElementById('remainingPlays').innerText = remainingPlays;

// Khi trang tải, cập nhật điểm hiển thị cho từng game
document.addEventListener('DOMContentLoaded', () => {
    // Hiển thị điểm cho Game 1 và Game 2
    for (let i = 1; i <= 2; i++) {
        let gameScore = localStorage.getItem(`game${i}Score`) ? parseInt(localStorage.getItem(`game${i}Score`)) : 0;
        document.getElementById(`score${i}`).innerText = `Score Game ${i}: ${gameScore}`;
    }
});

// Tạo hàm để cập nhật điểm số của từng game
function increaseScore(gameId) {
    // Lấy điểm số hiện tại của game từ localStorage
    let gameScore = localStorage.getItem(`game${gameId}Score`) ? parseInt(localStorage.getItem(`game${gameId}Score`)) : 0;

    // Tăng điểm cho game tương ứng
    if (gameId === 1) {
        gameScore += 3; // Tăng điểm cho game 1
    } else if (gameId === 2) {
        gameScore += 2; // Tăng điểm cho game 2
    }
    
    // Cập nhật điểm cho game
    localStorage.setItem(`game${gameId}Score`, gameScore);
    document.getElementById(`score${gameId}`).innerText = `Score Game ${gameId}: ${gameScore}`;

    // Cập nhật tổng điểm
    if (gameId === 1) {
        totalScore += 3; // Cộng thêm 3 vào tổng điểm nếu chơi game 1
    } else if (gameId === 2) {
        totalScore += 2; // Cộng thêm 2 vào tổng điểm nếu chơi game 2
    }

    localStorage.setItem('totalScore', totalScore);
    document.getElementById('totalScore').innerText = totalScore;

    // Giảm số lần chơi còn lại
    remainingPlays -= 1;
    localStorage.setItem('remainingPlays', remainingPlays);
    document.getElementById('remainingPlays').innerText = remainingPlays;

    // Nếu đã hết số lần chơi, vô hiệu hóa nút chơi
    if (remainingPlays <= 0) {
        document.getElementById('playButton').disabled = true;
        document.getElementById('resultMessage').innerText = "Bạn đã hết lượt chơi hôm nay!";
    }
}

// Hàm để chơi game
document.getElementById('playButton').addEventListener('click', () => {
    const userNumber = parseInt(document.getElementById('userNumber').value);
    // Giả sử người dùng chơi game 1
    increaseScore(1); // Hoặc bạn có thể dùng logic khác để xác định game nào được chơi
});

// Hàm điểm danh hàng ngày
function dailyCheckIn() {
    const today = new Date().toDateString(); // Lấy ngày hiện tại dưới dạng chuỗi
    const lastCheckIn = localStorage.getItem('lastCheckIn');

    // Kiểm tra nếu đã điểm danh hôm nay chưa
    if (lastCheckIn === today) {
        document.getElementById('checkinStatus').innerText = 'Bạn đã điểm danh hôm nay rồi!';
        return;
    }

    // Nếu chưa, tăng tổng điểm lên 1 và cập nhật ngày điểm danh
    totalScore += 1;
    localStorage.setItem('totalScore', totalScore);
    localStorage.setItem('lastCheckIn', today);
    document.getElementById('totalScore').innerText = totalScore;

    document.getElementById('checkinStatus').innerText = 'Bạn đã điểm danh thành công!';
}

// Lấy điểm từ từng trò chơi
let game1Score = localStorage.getItem('game1Score') ? parseInt(localStorage.getItem('game1Score')) : 0;
let game2Score = localStorage.getItem('game2Score') ? parseInt(localStorage.getItem('game2Score')) : 0;

// Cập nhật điểm cho từng game
document.getElementById('score1').innerText = `Score Game 1: ${game1Score}`;
document.getElementById('score2').innerText = `Score Game 2: ${game2Score}`;
