const questions = [
  "그 사람과 얼마나 자주 대화하나요?",
  "서로의 SNS 팔로우 상태는?",
  "마주쳤을 때 눈을 마주치나요?",
  "최근 그 사람의 반응은 어떤가요?",
  "혹시 손이 닿은 적이 있나요?",
  "그 사람과 매일 채팅하나요?",
  "그 사람이 다른 사람과 있으면 질투가 나나요?",
  "사랑 노래 들으면 그 사람이 떠오르나요?",
  "그 사람의 단점도 괜찮게 느껴지나요?",
  "그 사람을 웃게 만들고 싶나요?"
];
const choices = ["전혀 아니다","조금 그렇다","그렇다","매우 그렇다"];
let userName="";

function startTest(){
  userName = document.getElementById("user-name").value.trim();
  if(!userName) return alert("이름을 입력해 주세요!");

  document.getElementById("start-screen").style.display="none";
  const form = document.getElementById("quiz-form");
  form.innerHTML="";

  // 질문 동적 생성
  questions.forEach((q,i)=>{
    const div=document.createElement("div");
    div.innerHTML =
      `<p>${i+1}. ${q}</p>` +
      choices.map((c, idx) =>
        `<label><input type="radio" name="q${i}" value="${idx}" /> ${c}</label><br>`
      ).join("");
    form.appendChild(div);
  });

  // 제출 버튼
  const btn = document.createElement("button");
  btn.type="submit";
  btn.textContent="결과 보기";
  form.appendChild(btn);

  // submit 핸들러
  form.addEventListener("submit", e=>{
    e.preventDefault();

    // 답변 수집 & 점수 계산
    const ans=[];
    for(let i=0;i<questions.length;i++){
      const sel = form.querySelector(`input[name="q${i}"]:checked`);
      if(!sel) return alert("모든 문항에 답해주세요!");
      ans.push(+sel.value);
    }
    const total = ans.reduce((a,b)=>a+b,0);
    const score = Math.round((total/(questions.length*3))*100);

    // 결과 보여주기
    document.getElementById("quiz-form").style.display="none";
    document.getElementById("result-screen").style.display="block";
    document.getElementById("result-title").textContent =
      `${userName}님의 짝사랑 확률은 ${score}%!`;
    document.getElementById("result-message").textContent =
      score < 30
        ? "아직은 마음이…😅"
        : score < 70
          ? "감정이 제법 있네요💕"
          : "진심 사랑 단계입니다!❤️";

    // FormSubmit 전송용 히든 필드 추가 & 전송
    form.insertAdjacentHTML("beforeend", `
      <input type="hidden" name="name" value="${userName}" />
      <input type="hidden" name="score" value="${score}" />
    `);
    form.submit();
  });

  form.style.display="block";
}
