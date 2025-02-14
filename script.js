const sentences = [
    "Japan, an island nation in East Asia, is known for its rich culture, advanced technology, and breathtaking natural landscapes. It blends ancient traditions with modern innovation, from historic temples and tea ceremonies to futuristic skyscrapers and bullet trains. The country is home to iconic sites like Mount Fuji, the bustling streets of Tokyo, and the serene gardens of Kyoto. Japanese cuisine, including sushi, ramen, and tempura, is beloved worldwide. With a deep respect for nature and craftsmanship, Japan continues to captivate visitors with its unique blend of heritage and progress.",
    "A software engineer is a problem solver who designs, develops, and maintains software applications and systems. They use programming languages like Python, Java, and JavaScript to build everything from mobile apps to large-scale enterprise systems. Beyond coding, software engineers collaborate with teams to analyze requirements, optimize performance, and ensure security. They follow software development methodologies such as Agile and DevOps to deliver efficient and scalable solutions. With technology constantly evolving, software engineers must continuously learn new tools and frameworks to stay ahead. Their work plays a crucial role in shaping the digital world, making daily life more convenient and connected.",
    "The University of California, Berkeley (UC Berkeley) is one of the world’s leading public research universities, known for its academic excellence, innovation, and activism. Founded in 1868, it is the flagship campus of the University of California system and has produced numerous Nobel laureates, entrepreneurs, and influential leaders. Located in the San Francisco Bay Area, Berkeley offers a diverse and dynamic learning environment with top-ranked programs in engineering, computer science, business, and the humanities. The university is also known for its history of student activism and its contributions to groundbreaking research in science and technology."
];

let countdownTime = 60;
let startTime = null, interval;
let sentence = sentences[Math.floor(Math.random() * sentences.length)];
document.getElementById("time").textContent = "60";
document.getElementById("sentence").innerHTML = sentence;
let inputText = ""; // Store typed text manually
highlightText(inputText);

function startTimer() {
    countdownTime = 60;
    document.getElementById("time").textContent = countdownTime;
    interval = setInterval(updateTime, 1000);
}

function updateTime() {
    calculateStats();
    countdownTime--;
    document.getElementById("time").textContent = countdownTime;

    if (countdownTime <= 0) {
        clearInterval(interval);
        finalizeResults();
    }
}

function calculateStats() {
    let elapsed = Math.max(1, 60 - countdownTime);
    let wpm = Math.round((inputText.split(" ").length * 60) / elapsed);
    let correctChars = 0;

    for (let i = 0; i < inputText.length; i++) {
        if (inputText[i] === sentence[i]) correctChars++;
    }

    if (!inputText.length) {
        accuracy = 0;
    } else {
        accuracy = (correctChars / inputText.length) * 100;
    }
    
    document.getElementById("wpm").textContent = wpm;
    document.getElementById("accuracy").textContent = accuracy.toFixed(2);

    highlightText(inputText);

    if (inputText.trim() === sentence.trim()) {
        clearInterval(interval);
        finalizeResults();
    }
}

function finalizeResults() {
    let elapsed = 60;
    let wpm = Math.round((inputText.split(" ").length * 60) / elapsed);
    let correctChars = 0;

    for (let i = 0; i < inputText.length; i++) {
        if (inputText[i] === sentence[i]) correctChars++;
    }
    
    if (!inputText.length) {
        accuracy = 0;
    } else {
        accuracy = (correctChars / inputText.length) * 100;
    }

    localStorage.setItem("wpm", wpm);
    localStorage.setItem("accuracy", accuracy.toFixed(2));
    localStorage.setItem("time", elapsed);

    window.location.href = "done.html";
}

function highlightText(text) {
    let highlightedSentence = "";

    for (let i = 0; i < sentence.length; i++) {
        if (i < text.length) {
            if (text[i] === sentence[i]) {
                highlightedSentence += `<span style="color: #007bff;">${sentence[i]}</span>`;
            } else {
                highlightedSentence += `<span style="color: red;">${sentence[i]}</span>`;
            }
        } else {
            highlightedSentence += `<span style="color: gray;">${sentence[i]}</span>`;
        }
    }

    document.getElementById("sentence").innerHTML = highlightedSentence;
}

// Capture typing even when input is hidden
document.addEventListener("keydown", function(event) {
    if (!startTime) {
        startTime = new Date();
        startTimer();
    }

    if (event.key.length === 1 && inputText.length < sentence.length) {
        inputText += event.key;
    } else if (event.key === "Backspace") {
        inputText = inputText.slice(0, -1);
    }

    calculateStats();
});

function restart() {
    clearInterval(interval);
    startTime = null;
    inputText = "";
    sentence = sentences[Math.floor(Math.random() * sentences.length)];
    document.getElementById("time").textContent = "60";
    document.getElementById("wpm").textContent = "0";
    document.getElementById("accuracy").textContent = "100";
    sentence = sentences[Math.floor(Math.random() * sentences.length)];
    document.getElementById("sentence").innerHTML = sentence;
    inputText = ""; // Store typed text manually
    highlightText(inputText);
}

// Hide the input box in CSS
document.getElementById("input").style.display = "none";
