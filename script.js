window.onload=function(){

    //요소 접근
    let check_btns = document.querySelectorAll(".check");
    const bar_btns = document.querySelectorAll(".bar-btn");
    const circle = document.querySelector(".circle");
    const body = document.querySelector("body");
    const bar = document.querySelector(".bar");
    const text = document.querySelector("#text");
    const add_btn = document.querySelector("button");
    const list = document.querySelector(".lists");
    let cleard_list = document.querySelectorAll(".clear");
    //현재 모드
    let isSun = true;

    //할 일 체크 여부
    check_btns.forEach((btn)=>{
        btn.addEventListener("click",function(){
            this.parentElement.classList.contains("clear") ? 
                this.parentElement.classList.remove("clear") :
                this.parentElement.classList.add("clear");

                cleard_list = document.querySelectorAll(".clear");
                isSun ? brightCheck() : darkCheck();
        })
    })

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
}
