const btn = document.getElementById('btn');         //버튼
let addValue = document.getElementById('addValue'); //할일 입력
let result = document.getElementById('result');    //추가된 할일
let check_result = document.getElementById('check_result');    //추가된 할일
//할일 추가시
function addTodo(){
    if(addValue.value==false){     /*''도 가능 */
        alert('내용을 입력하세요!');
    }
    else{
        let list = document.createElement("li");
        let del = document.createElement('button');
        let check = document.createElement('button');
        list.innerHTML = addValue.value;
        result.appendChild(list); //추가된 할일에 할일 리스트 추가하기
        list.appendChild(del);    //할일 리스트 추가시 삭제버튼도 추가   
        list.appendChild(check); 
        
        del.innerText = "x";      //삭제버튼에 들어갈 'x'자 문자
        del.style.fontSize = "20px";
        del.style.border = "none";
        del.style.float = "right";
        del.style.right = "17px";
        del.style.marginTop = "10px";
        del.style.cursor = "pointer";
        del.addEventListener("click", deleteList); //삭제버튼 클릭
        del.style.position='relative';

        check.innerText = "v"
        check.style.fontSize="20px";
        check.style.border="none";
        check.style.float = "right";
        check.style.right = "17px";
        check.style.marginTop = "10px";
        check.style.marginRight = "5px";
        check.style.cursor = "pointer";
        check.style.position = "relative";
        check.addEventListener("click",addList);
    }
}
//할일 목록 삭제
function deleteList(e){ 
    let removeOne = e.target.parentElement;  //선택한 목록 한개만 지우기
    removeOne.remove();
}

//완료 목록 추가
function addList(e){
    if(confirm("완료 하셨습니까?")==true){
        let check_One = e.target.parentElement;
        check_result.appendChild(check_One);
        
    }else{
        return false;
    }
    
}

//모두 삭제
function allClearList(e){
    if(confirm("정말 삭제하시겠습니까?")==true){   
        if(result.innerText==''){                      
            alert("삭제할 목록이 없습니다");             
        }else{                                         
            result.innerText='';                      
        }
    }else{                                     
        return false;                          
    }
}