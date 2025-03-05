const btn = document.getElementById('btn');         // 추가 버튼
let addValue = document.getElementById('addValue'); // 할 일 입력
let result = document.getElementById('result');    // 추가된 할 일 목록
let check_result = document.getElementById('check_result'); // 완료된 목록

let todos = [];

// 초기화
const init = () => {
    const userTodos = JSON.parse(localStorage.getItem('todos'));
    
    if(userTodos){
        userTodos.forEach(todo => addTodo(todo.text, todo.id, true));
        todos = userTodos;
    }
};

// 로컬스토리지 저장
const save = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
};

// 할 일 추가 함수
function addTodo(text, id = Date.now(), fromStorage = false) {
    if (!text) return //텍스트 없으면 종료

    const todo = {id, text}
    //console.log(todo)
    
    todos.push(todo);
    save();
    
    let list = document.createElement("li");
    list.textContent = text;
    list.id = id;

    let del = document.createElement('button');
    let check = document.createElement('button');

    del.innerText = "x";
    del.style.fontSize = "20px";
    del.style.border = "none";
    del.style.float = "right";
    del.style.right = "17px";
    del.style.marginTop = "10px";
    del.style.cursor = "pointer";
    del.style.position = 'relative';
    del.addEventListener("click", deleteList);

    check.innerText = "v";
    check.style.fontSize = "20px";
    check.style.border = "none";
    check.style.float = "right";
    check.style.right = "17px";
    check.style.marginTop = "10px";
    check.style.marginRight = "5px";
    check.style.cursor = "pointer";
    check.style.position = "relative";
    check.addEventListener("click", completeTodo);

    list.appendChild(del);
    list.appendChild(check);
    result.appendChild(list);
}

// 할 일 추가 버튼 이벤트
btn.addEventListener("click", () => {
    addTodo(addValue.value);
    addValue.value = ""; // 입력 필드 초기화
});

// 할 일 삭제 함수
function deleteList(e) { 
    let target = e.target.parentElement;
    target.remove();
    todos = todos.filter(todo => todo.id !== parseInt(target.id));
    save();
}

// 할 일 완료 처리 함수
function completeTodo(e) {
    if (confirm("완료 하셨습니까?")) {
        let completedTask = e.target.parentElement;
        check_result.appendChild(completedTask);

        todos = todos.filter(todo => todo.id !== parseInt(completedTask.id));
        save();
    }
}

// 모든 할 일 삭제 함수
function allClearList() {
    if (confirm("정말 삭제하시겠습니까?")) {
        if (result.children.length === 0) {                      
            alert("삭제할 목록이 없습니다");             
        } else {                                         
            result.innerHTML = ''; // UI에서 목록 제거
            todos = []; // 데이터 초기화
            save(); // 로컬스토리지 업데이트
        }
    }
}

// 초기화 실행
init();
