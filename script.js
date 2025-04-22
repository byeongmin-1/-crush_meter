const questions = [
  "그 사람과 얼마나 자주 대화하나요?",
  "그 사람의 연락은 항상 확인하나요?",
  "그 사람을 도와주고 싶나요?",
  "자기 전에 자주 생각나나요?",
  "그 사람에게 시선이 자주 가나요?",
  "그 사람과 매일 채팅하나요?",
  "그 사람이 다른 사람과 있으면 질투가 나나요?",
  "사랑 노래 들으면 그 사람이 떠오르나요?",
  "그 사람의 단점도 괜찮게 느껴지나요?",
  "그 사람을 웃게 만들고 싶나요?"
];

const choices = ["전혀 아니다", "조금 그렇다", "그렇다", "매우 그렇다"];

let userName = "";

function startTest() {
  userName = document.getElementById("user-name").value.trim();
  if (!userName) {
    alert("이름을 입력해 주세요!");
    return;
  }

  document.getElementById("start-screen").style.display = "none";
  const form = document.getElementById("quiz-form");
  form.innerHTML = "";

  questions.forEach((q, index) => {
    const div = document.createElement("div");
    div.innerHTML = `<p>${index + 1}. ${q}</p>` + choices.map((c, i) =>
      `<label><input type="radio" name="q${index}" value="${i}"> ${c}</label><br>`
    ).join("");
    form.appendChild(div);
  });

  const submitBtn = document.createElement("button");
  submitBtn.textContent = "결과 보기";
  submitBtn.type = "button";
  submitBtn.onclick = showResult;
  form.appendChild(submitBtn);

  form.style.display = "block";
}

function showResult() {
  const answers = [];
  for (let i = 0; i < questions.length; i++) {
    const radios = document.getElementsByName(`q${i}`);
    let checked = false;
    for (const r of radios) {
      if (r.checked) {
        answers.push(parseInt(r.value));
        checked = true;
      }
    }
    if (!checked) {
      alert("모든 질문에 답해주세요!");
      return;
    }
  }

  const total = answers.reduce((a, b) => a + b, 0);
  const score = Math.round((total / (questions.length * 3)) * 100);

  let message = "";
  if (score < 30) message = "음… 아직은 마음이 깊지 않은 듯해요.";
  else if (score < 70) message = "오! 짝사랑 감정이 꽤 있어 보이네요 💕";
  else message = "헉… 이건 거의 사랑입니다. 진심이에요 ❤️";

  document.getElementById("quiz-form").style.display = "none";
  document.getElementById("result-screen").style.display = "block";
  document.getElementById("result-title").textContent = `${userName}님의 짝사랑 확률은 ${score}%!`;
  document.getElementById("result-message").textContent = message;
}

