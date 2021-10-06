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

    //할 일 체크하기
    function clearOrNotTodo(){
        check_btns.forEach((btn)=>{
            btn.addEventListener("click",function(){
                this.parentElement.classList.contains("clear") ? 
                    this.parentElement.classList.remove("clear") :
                    this.parentElement.classList.add("clear");
    
                cleard_list = document.querySelectorAll(".clear");
                isSun ? brightCheck() : darkCheck();

                //배열 내 해당 객체 clear값 변경 해야함 false<->true
                //로컬로 값 보낼 때 애초에 clear값도 함께 보내었어야 함.....{todo:"something",claer" false} 이런식으로



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

    //localStorage조회하여 배열에 넣고 화면에 보이기
    for(let i=0;i<localStorage.length;i++){
        toDoArray.push({todo : localStorage.getItem(i),claer : false});

        list.innerHTML+=`<li><span class='check'><i class='fas fa-check'></i></span>${localStorage.getItem(i)}<span class='delete'><i class='far fa-trash-alt'></i></span></li>`;

        check_btns = document.querySelectorAll(".check");
        delete_btns = document.querySelectorAll(".delete");
        clearOrNotTodo();
        deleteTodo();
    }

    //========================입력창에 할 일 입력========================//
    //할 일 추가 함수(+버튼 혹은 enter 키(keyCode : 13))
    add_btn.addEventListener("click",checkValue);
    window.addEventListener("keydown",function(e){
        if(e.keyCode ===13){
            checkValue();
        }
    });
    //할 일 입력 값 확인 함수
    function checkValue(){
        !text.value ? alert("할 일을 입력해주세요") : checkTodo(text.value);
    }
    //할 일 목록 조회 함수
    function checkTodo(txt){
        let check = false;
        for(let i=0; i<toDoArray.length; i++){
            toDoArray[i].todo === txt ? check = true : check=false;
            if(check) break;
        }
        check ? alert("해당 할 일은 이미 존재합니다!") : insertTodo(txt);
    }
    //localStorage 저장 함수
    function insertTodo(txt){
        //배열에 todo push
        toDoArray.push({todo : txt , clear : false});
        //로컬에 저장
        localStorage.setItem(toDoArray.length-1, txt);
        //할 일을 목록에 표현하기 : li 추가
        list.innerHTML+=`<li><span class='check'><i class='fas fa-check'></i></span>${txt}<span class='delete'><i class='far fa-trash-alt'></i></span></li>`;
        
        check_btns = document.querySelectorAll(".check");
        delete_btns = document.querySelectorAll(".delete");
        clearOrNotTodo();
        deleteTodo();
        isSun ? brightCheck() : darkCheck();
    }
    
}
