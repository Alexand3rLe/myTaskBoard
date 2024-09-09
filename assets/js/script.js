let taskList = JSON.parse(localStorage.getItem("tasks")) || [];

console.log(taskList)


const taskForm = document.getElementById("taskForm");    
const taskFormBtn = document.getElementById("taskFormBtn");

const taskTitle = document.getElementById("taskTitle");
const taskDate = document.getElementById("taskDate");
const taskDescription = document.getElementById("taskDescription");

taskFormBtn.addEventListener('click',() => handleAddTask())

function handleAddTask() {
    if(!taskTitle.value || !taskDate.value || !taskDescription.value){
        alert("Please fill out the form.")
    }
    else{
        let taskObj = {
            id: crypto.randomUUID(),
            title: taskTitle.value,
            date: taskDate.value,
            description: taskDescription.value,
            status: 'to-do'
        }

        taskList.push(taskObj);
        localStorage.setItem('tasks', JSON.stringify(taskList));

        renderTaskCard()
    }

}

function createTaskCard(task) {

        const taskCard = document.createElement("div");
            taskCard.classList.add("card", "task-card", "draggable", "my-3");
            taskCard.setAttribute("data-task-id", task.id);

        const taskTitleEl = document.createElement("div");
            taskTitleEl.classList.add("card-header", "h4");

        const titleElContent = document.createTextNode(task.title);
            taskTitleEl.appendChild(titleElContent);

        const taskBodyEl = document.createElement("div");
            taskBodyEl.classList.add("card-body");

        const cardDescription = document.createElement("p");
            cardDescription.classList.add("card-text");

        const cardDescriptionContent = document.createTextNode(task.description);

        cardDescription.appendChild(cardDescriptionContent);
        taskBodyEl.append(cardDescription);
        
        const cardDate = document.createElement("p");
            cardDate.classList.add("card-text");

        const cardDateContent = document.createTextNode(task.date);

        cardDate.appendChild(cardDateContent);
        taskBodyEl.appendChild(cardDate);

        const cardDeleteBtn = document.createElement("button");
            cardDeleteBtn.classList.add("btn", "btn-danger", "delete");
            cardDeleteBtn.setAttribute("data-task-id", task.id)
            cardDeleteBtn.addEventListener('click', handleDeleteTask);
        const deleteBtnText = document.createTextNode("Delete");
            cardDeleteBtn.appendChild(deleteBtnText);
        
        
        
        taskBodyEl.appendChild(cardDeleteBtn);
        taskCard.appendChild(taskTitleEl);
        taskCard.appendChild(taskBodyEl);

       return taskCard;
}

function emptyDiv(div) {
    while (div.firstChild) {
        div.removeChild(div.firstChild)
    }
}

function renderTaskCard() {
    const todoList = document.getElementById("todo-cards")
    emptyDiv(todoList);
    const inProgressList = document.getElementById("in-progress-cards");
    emptyDiv(inProgressList);
    const doneList = document.getElementById("done-cards")
    emptyDiv(doneList)
        for (const task of taskList) {
            if (task.status === 'to-do') {
                todoList.append(createTaskCard(task))
            }
            else if (task.status === "in-progress") {
                inProgressList.append(createTaskCard(task));
            }
            else if (task.status === "done") {
                doneList.append(createTaskCard(task))
            }
        }    
    
        $('.draggable').draggable({
            opacity: 0.7,
            zIndex: 100,
    
            helper: function(e) {
                const original = $(e.target).hasClass('ui-draggable')
                ? $(e.target)
                : $(e.target).closest('.ui-draggable')
    
                return original.clone().css({
                    width: original.outerWidth(),
                })
            }
        })
}

function handleDeleteTask() {
    const taskId = $(this).attr('data-task-id');
    console.log(taskId)


    for(task of taskList) {
        if (task.id === taskId) {
            taskList.splice(taskList.indexOf(task), 1)
            localStorage.setItem('tasks', JSON.stringify(taskList))
        }
    }
    renderTaskCard()
};

function handleDrop(event, ui) {
    const taskId = ui.draggable[0].dataset.taskId;

    const newStatus = event.target.id

    for (let task of taskList) {
        if (task.id === taskId) {
            task.status = newStatus
            localStorage.setItem('tasks', JSON.stringify(taskList));
        }
    }
    renderTaskCard()
}



$(document).ready(function () {

    renderTaskCard()

    $('#taskDate').datepicker({
        changeMonth: true,
        changeYear: true
    })

    $('.lane').droppable({
        accept: '.draggable',
        drop: handleDrop
    })
});

















// Retrieve tasks and nextId from localStorage
// let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
// let nextId = JSON.parse(localStorage.getItem("nextId"));
// const taskForm = $('#addTaskBtn')

// // Todo: create a function to generate a unique task id
// function generateTaskId() {

// }

// // Todo: create a function to create a task card
// function createTaskCard(task) {
//     const taskCard = $('<div>')
//         .addClass('card project-card draggable my-3');
//     const cardHeader = $("<div>").addClass("card-header hr").text(task.taskTitle);
//     const cardBody = $("<div>").addClass("card-body");
//     const cardDescription = $('<p>').addClass("card-text").text(task.taskDescription);

//     const cardDueDate = $('<p>').addClass('card-text').text(task.taskDate);

//     cardBody.append(cardDescription, cardDueDate);
//     taskCard.append(cardHeader, cardBody);

//     return taskCard;
// }

//  /// Todo: create a function to render the task list and make cards draggable
// function renderTaskList() {
//     const todoList = $('#todo-cards');
//     todoList.empty();

//     const inProgressList = $('#in-progress-cards');
//     inProgressList.empty();

//     const doneList = $('#done-cards')
//     doneList.empty();

//     for (let task of taskList) {
//         if(task.status === 'to-do') {
//             todoList.append(createTaskCard(task));
//         }
//         else if (task.status === 'in-progress') {
//             inProgressList.append(createTaskCard(task));
//         }
//         else if (task.status === 'done') {
//             doneList.append(createTaskCard(task))
//         }
//     }

//     $('.draggable').draggable({
//         opacity: 0.7,
//         zIndex: 100,

//         helper: function(e) {
//             const original = $(e.target).hasClass('ui-draggable')
//              ? $(e.target)
//              : $(e.target).closest('.ui-draggable');

//             return original.clone().css({
//                 width: original.outerWidth(),
//             });
//         },
//     });
// }

// // // Todo: create a function to handle adding a new task
// function handleAddTask(){
//     const taskTitleInput = $('#taskTitleInput').val();
//     const taskDateInput = $('#taskDateInput').val();
//     const taskDescripInput = $('#taskDescripInput').val();

//     if(!taskTitleInput || !taskDateInput || !taskDescripInput) {
//         alert('Please fill out the form.')
//         return;
//     }
//     else {
//         const newTask = {
//             taskTitle: taskTitleInput,
//             taskDate: taskDateInput,
//             taskDescription: taskDescripInput,
//             status: 'to-do'
//         };
        
//         taskList.push(newTask);
//         nextId.push(newTask);
//         localStorage.setItem("nextId", JSON.stringify(nextId))
//         localStorage.setItem('tasks', JSON.stringify(taskList))
        
//         createTaskCard()
//     }
// }

// // Todo: create a function to handle deleting a task
// function handleDeleteTask(event){

// }

// // Todo: create a function to handle dropping a task into a new status lane
// function handleDrop(event, ui) {

// }

// taskForm.on('click', handleAddTask)

// // Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
// $(document).ready(function () {
//     renderTaskList()

//     $('#taskDateInput').datepicker({
//         changeMonth: true,
//         changeYear: true
//     })

//     $('.lane').droppable({
//         accept: '.draggable',
//         drop: handleDrop
//     })
// });


