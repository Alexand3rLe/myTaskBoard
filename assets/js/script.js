// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId"));
const taskForm = $('#addTaskBtn')

// Todo: create a function to generate a unique task id
function generateTaskId() {

}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskCard = $('<div>')
        .addClass('card project-card draggable my-3');
    const cardHeader = $("<div>").addClass("card-header hr").text(task.taskTitle);
    const cardBody = $("<div>").addClass("card-body");
    const cardDescription = $('<p>').addClass("card-text").text(task.taskDescription);

    const cardDueDate = $('<p>').addClass('card-text').text(task.taskDate);

    cardBody.append(cardDescription, cardDueDate);
    taskCard.append(cardHeader, cardBody);

    return taskCard;
}

 /// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    const todoList = $('#todo-cards');
    todoList.empty();

    const inProgressList = $('#in-progress-cards');
    inProgressList.empty();

    const doneList = $('#done-cards')
    doneList.empty();

    for (let task of taskList) {
        if(task.status === 'to-do') {
            todoList.append(createTaskCard(task));
        }
        else if (task.status === 'in-progress') {
            inProgressList.append(createTaskCard(task));
        }
        else if (task.status === 'done') {
            doneList.append(createTaskCard(task))
        }
    }

    $('.draggable').draggable({
        opacity: 0.7,
        zIndex: 100,

        helper: function(e) {
            const original = $(e.target).hasClass('ui-draggable')
             ? $(e.target)
             : $(e.target).closest('.ui-draggable');

            return original.clone().css({
                width: original.outerWidth(),
            });
        },
    });
}

// // Todo: create a function to handle adding a new task
function handleAddTask(){
    const taskTitleInput = $('#taskTitleInput').val();
    const taskDateInput = $('#taskDateInput').val();
    const taskDescripInput = $('#taskDescripInput').val();

    if(!taskTitleInput || !taskDateInput || !taskDescripInput) {
        alert('Please fill out the form.')
        return;
    }
    else {
        const newTask = {
            taskTitle: taskTitleInput,
            taskDate: taskDateInput,
            taskDescription: taskDescripInput,
            status: 'to-do'
        };
        
        taskList.push(newTask);

        localStorage.setItem('tasks', JSON.stringify(taskList))

        createTaskCard()
    }
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

taskForm.on('click', handleAddTask)

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList()

    $('#taskDateInput').datepicker({
        changeMonth: true,
        changeYear: true
    })

    $('.lane').droppable({
        accept: '.draggable',
        drop: handleDrop
    })
});


