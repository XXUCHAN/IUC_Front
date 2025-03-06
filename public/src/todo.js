const btn = document.getElementById('btn');         // 추가 버튼
let addValue = document.getElementById('addValue'); // 할 일 입력
let result = document.getElementById('result');    // 추가된 할 일 목록
let check_result = document.getElementById('check_result'); // 완료된 목록

let todos = []; //todolist 배열
let done = []; //completedTask 배열

// 초기화
const init = () => {
    //localstorage파싱, 저장
    const userTodos = JSON.parse(localStorage.getItem('todos'));
    const userDone =  JSON.parse(localStorage.getItem('done'));
    if(userTodos){
        userTodos.forEach(todo => addTodo(todo.text, todo.id, true));
        todos = userTodos;
    }
    if(userDone){
        userDone.forEach(done=>addDone(done.text,done.id,true));
        done = userDone;
    }
};

// 로컬스토리지 저장
const save = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
};
const save_done = () =>{
    localStorage.setItem('done', JSON.stringify(done));
};

// 할 일 추가 함수
function addTodo(text, id = Date.now(), fromStorage = false) {
    if (!text) return 
    const todo = {id, text}
    todos.push(todo);
    save();
    let del = document.createElement('button');
    let check = document.createElement('button');
    let edit = document.createElement("button");
    let list = document.createElement("li");
    list.textContent = text;
    list.id = id;
    //del버튼, listenr
    del.classList.add("del-button"); 
    del.addEventListener("click", deleteList);
    //완료버튼, listner
    check.classList.add("check-button");
    check.addEventListener("click", completeTodo);
    //수정버튼, listner    
    edit.classList.add("edit-button");
    edit.addEventListener("click", editTodo);

    list.appendChild(edit);
    list.appendChild(del);
    list.appendChild(check);
    result.appendChild(list);
}
// 삭제 함수
function deleteList(e) { 
    let target = e.target.parentElement;
    target.remove();
    todos = todos.filter(todo => todo.id != parseInt(target.id));
    save();
}

// 완료 된 일 삭제 함수
function deleteDoneList(e){ 
    let target = e.target.parentElement;
    target.remove();
    done = done.filter(done => done.id != parseInt(target.id));
    save_done();
}

// 할 일 완료 처리 함수
function completeTodo(e) {
    if (confirm("완료 하셨습니까?")) {
        // 타깃의 id, text 객체 생성
        let completedTask = e.target.parentElement;
        let id = completedTask.id;
        let text  = completedTask.innerText;
        const task = { id,text};
        // init에서 데이터를 가져오기 위함
        done.push(task);
        done = done.filter(done => done.id !== parseInt(id));
        save_done();
        // li에 완료된 테스크 추가  
        addDone(text,id);
        // todolist에서 제거
        deleteList(e);
    }
}

function addDone(text,id,fromStorage = false){
    let list = document.createElement("li");
    list.textContent = text;
    list.id = id;
    //삭제 버튼 추가
    let del = document.createElement('button');
    del.classList.add("del-button"); 
    del.addEventListener("click", deleteDoneList);
    //취소선 추가
    list.classList.add("completed"); 
    // ID(Date.now) 변환
    let timeSpan = document.createElement("span");
    let time = formatTimestamp(parseInt(id)); 
    timeSpan.textContent = ` (${time})`;
    timeSpan.classList.add("time"); 
    //html달기
    list.appendChild(del)
    list.appendChild(timeSpan);
    check_result.appendChild(list);
}

// 모든 할 일 삭제 함수
function allClearList() {
    if (confirm("정말 삭제하시겠습니까?")) {
        if (result.children.length === 0) {                      
            alert("삭제할 목록이 없습니다");             
        } else {                                         
            result.innerHTML = '';  
            todos = []; 
            save(); 
        }
    }
}

// 텍스트 수정 함수
function editTodo(e) {
    let target = e.target.parentElement;
    id = target.id;
    let listItem = document.getElementById(id);
    if (!listItem) return;
    
    let currentText = listItem.firstChild.textContent.trim();
    let inputField = document.createElement("input");
    
    inputField.type = "text";
    inputField.value = currentText;
    inputField.classList.add("edit-input");
    
    // 기존 텍스트를 감싸는 span 요소 찾기 (없으면 생성) ?감싸지 않는 방법?
    let textSpan = listItem.querySelector(".todo-text");
    if (!textSpan) {
        textSpan = document.createElement("span");
        textSpan.classList.add("todo-text");
        textSpan.textContent = listItem.textContent.trim();
        listItem.innerHTML = ""; // 기존 내용 삭제
        listItem.appendChild(textSpan);
    }

    textSpan.style.visibility = "hidden";

    function saveEdit() {
        let newText = inputField.value.trim();
        if (newText) {
            listItem.firstChild.textContent = newText;
            todos.forEach(todo => {
                if (todo.id == id) {
                    todo.text = newText;
                }
            });
            save();
        }
        listItem.removeChild(inputField);
        
        textSpan.style.visibility = "visible"; 
    }
    
    inputField.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            saveEdit();
            //location.reload();
            loadTodos();
        }
    });
    
    listItem.insertBefore(inputField, listItem.firstChild);
    inputField.focus();
}

// 새로 페이지 로드
function loadTodos() {
    result.innerHTML = "";
    todos = [];
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    savedTodos.forEach(todo => addTodo(todo.text, todo.id, true));
}

//시간 변환
function formatTimestamp(timestamp) {
    return new Date(timestamp).toLocaleString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
}


init();

// 추가 버튼 
btn.addEventListener("click", () => {
    addTodo(addValue.value);
    addValue.value = ""; // 입력 필드 초기화
});