// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId"));
const taskForm = $('#addTaskBtn')

// Todo: create a function to generate a unique task id
function generateTaskId() {

}

// Todo: create a function to create a task card
function createTaskCard(task) {

}

 /// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

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


