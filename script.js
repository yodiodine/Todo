window.onload=function(){

    //요소 접근
    let check_btns = document.querySelectorAll(".check");
    let delete_btns = document.querySelectorAll(".delete");
    let bar_btns = document.querySelectorAll(".bar-btn");
    const circle = document.querySelector(".circle");
    const body = document.querySelector("body");
    const bar = document.querySelector(".bar");
    const text = document.querySelector("#text");
    const add_btn = document.querySelector("button");
    let list = document.querySelector(".lists");
    let cleard_list = document.querySelectorAll(".clear");
    //현재 모드
    let isSun = true;
    //할 일 목록 배열
    let toDoArray = [];
    //더미텍스트 배열
    const dummyText = ["독서30분","헬스 2시간 다녀오기","자격증 공부하기","강아지 산책 1시간","영화 한 편 감상하기",
    "인터넷 강의 하나 듣기","마트에서 식료품 장보기","토익 모의고사 하나 풀기","짧은 글 필사","영어 회화 30분",
    "일러스트 한 장 그리기","크로키 30분","게임은 1시간만","스터디 참여하기","쓰레기 버리는 날",
    "빨래 돌리기","청소기 돌리기","다이소에서 물건 사기","일본어 공부 1시간","고객센터에 문의 전화 넣기"];



    //할 일 체크하기
    function clearOrNotTodo(){
        check_btns.forEach((btn)=>{
            btn.addEventListener("click",function(){
                //클릭한 목록이 있는 배열 인덱스를 찾은 후 clear값 변경. 이후 배열 값에 따라 로컬 값 재설정
                let idx;
                for(let i=0; i<toDoArray.length;i++){
                    if(toDoArray[i].todo === this.parentElement.textContent){
                        idx = i;
                    }
                }
                toDoArray[idx].clear ? toDoArray[idx].clear = false : toDoArray[idx].clear = true;
                localStorage.setItem(idx, JSON.stringify(toDoArray[idx]));

                this.parentElement.classList.contains("clear") ? 
                    this.parentElement.classList.remove("clear") :
                    this.parentElement.classList.add("clear");
    
                cleard_list = document.querySelectorAll(".clear");
                isSun ? brightCheck() : darkCheck();

            })
        })
    }
    //할 일 삭제하기
    function deleteTodo(){
        delete_btns.forEach((btn)=>{
            btn.addEventListener("click",function(e){
                //배열에서 해당 투두 삭제
                let idx;
                for(let i=0; i<toDoArray.length;i++){
                    if(toDoArray[i].todo === this.parentElement.textContent){
                        idx = i;
                    }
                }
                toDoArray.splice(idx,1);
                //로컬에서 해당 투두 삭제 후 키 값 조정
                localStorage.removeItem(idx);
                for(idx; idx<toDoArray.length;idx++){
                    localStorage.setItem(idx,localStorage.getItem(idx+1));
                }
                localStorage.removeItem(idx);

                this.parentElement.remove();
            })
        })
    }

    //========================화면 모드========================//
    //밝기 모드 전환
    bar_btns.forEach((btn)=>{
        btn.addEventListener("click",function(){
            //클릭한 버튼의 아이콘 확인
            if(isSun){
                darkMode();
                isSun = false;
            }else{
                brightMode();
                isSun= true;
            }
        })
    })
    //주간모드
    function brightMode(){
        document.documentElement.style.setProperty('--fff-333',"#fff");
        document.documentElement.style.setProperty('--zero-eee',"#000");
        
        circle.style.transform = "translate(0px)";
        body.style.background = "#f5f5f5";
        bar.style.backgroundColor = "#333";
        bar.style.boxShadow = "0 0 10px #ccc";
        text.style.color = "#333";
        add_btn.style.color = "#fff";
        list.style.boxShadow = "0 5px 3px #eee";

        brightCheck();
    }
    //야간 모드
    function darkMode(){
        document.documentElement.style.setProperty('--fff-333',"#333");
        document.documentElement.style.setProperty('--zero-eee',"#eee");

        circle.style.transform = "translate(43px)";
        body.style.background = "#555";
        bar.style.backgroundColor = "#ccc";
        bar.style.boxShadow = "0 0 10px #333";
        text.style.color = "#eee";
        add_btn.style.color = "#000";
        list.style.boxShadow = "0 5px 3px #333";

        darkCheck();
    }
    //체크 버튼 주/야간 모드
    function brightCheck(){
        check_btns.forEach((btn)=>{
            btn.style.border = "2px solid #333";
        });
        cleard_list.forEach((li)=>{
            li.childNodes[0].style.borderColor = "#aaa";
        })
    }
    function darkCheck(){
        check_btns.forEach((btn)=>{
            btn.style.border = "2px solid #fff";
        })
        cleard_list.forEach((li)=>{
            li.childNodes[0].style.borderColor = "#aaa";
        })
    }
    //===========================================================//


    //========================처음 화면 배치========================//
    //localStorage조회하여 배열에 넣고 화면에 보이기
    for(let i=0;i<localStorage.length;i++){
        toDoArray.push({todo : JSON.parse(localStorage.getItem(i)).todo ,clear :  JSON.parse(localStorage.getItem(i)).clear});

        list.innerHTML+=`<li><span class='check'><i class='fas fa-check'></i></span>${JSON.parse(localStorage.getItem(i)).todo}<span class='delete'><i class='far fa-trash-alt'></i></span></li>`;

        check_btns = document.querySelectorAll(".check");
        delete_btns = document.querySelectorAll(".delete");
        clearOrNotTodo();
        deleteTodo();
    }

    //완료한 할 일 체크박스
    //배열마다 클리어가 true인 배열의 인덱스를 찾아 해당 li의 클래스에 clear를 붙인다.
    toDoArray.forEach((val,idx)=>{
        if(val.clear){
            list.children[idx].setAttribute("class","clear");
            cleard_list = document.querySelectorAll(".clear");
            isSun ? brightCheck() : darkCheck();
        }
    })

    function placeholderRenuwal(){
        let dummyNum = Math.floor(Math.random() * 19);
        text.setAttribute("placeholder",dummyText[dummyNum]);
    }
    placeholderRenuwal();

    //===========================================================//


    //========================입력창에 할 일 입력 로직========================//
    //할 일 추가 함수(+버튼 혹은 enter 키(keyCode : 13))
    add_btn.addEventListener("click",checkValue);
    window.addEventListener("keydown",function(e){
        if(e.keyCode ===13){
            checkValue();
        }
    });
    //할 일 입력 값 확인 함수
    function checkValue(){
        !text.value ? checkTodo(text.getAttribute("placeholder")) : checkTodo(text.value);
    }
    //할 일 목록 조회 함수
    function checkTodo(txt){
        let check = false;
        for(let i=0; i<toDoArray.length; i++){
            toDoArray[i].todo === txt ? check = true : check=false;
            if(check) break;
        }
        if(check){
            alert("해당 할 일은 이미 존재합니다!");
            placeholderRenuwal();
        }else{
            insertTodo(txt);
        }
    }
    //localStorage 저장 함수
    function insertTodo(txt){
        //배열에 todo push
        toDoArray.push({todo : txt , clear : false});
        //로컬에 저장
        localStorage.setItem(toDoArray.length-1, JSON.stringify(toDoArray[toDoArray.length-1]));
        //할 일을 목록에 표현하기 : li 추가
        list.innerHTML+=`<li><span class='check'><i class='fas fa-check'></i></span>${txt}<span class='delete'><i class='far fa-trash-alt'></i></span></li>`;
        //input초기화
        text.value = "";
        placeholderRenuwal();
        //innerHTML 이후 변수 재할당
        check_btns = document.querySelectorAll(".check");
        delete_btns = document.querySelectorAll(".delete");
        cleard_list = document.querySelectorAll(".clear");
        clearOrNotTodo();
        deleteTodo();
        isSun ? brightCheck() : darkCheck();
    }
    //===========================================================//


}
