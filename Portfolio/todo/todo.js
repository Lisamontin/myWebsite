const todoItems = $("#todo-items"); //ul
const todoForm = $("#todo-form");
const todoItem = $("#todo-list-item");
const key = 'todoItems';


//If there is data in local storage, fetch and display in todoItems ul.
if (localStorage.getItem(key) !== null) {  
  let fetchedItem = JSON.parse(localStorage.getItem(key));

  todoItems.html('');
  todoItems.html(fetchedItem);
}


// when data is submitted in form, check if there is value to display and add it as a list item in the ul. Save to local storage as HTML.
todoForm.submit((event) => {
  event.preventDefault(); 
  
  let item = todoItem.val();
  
  if (item) { 
    const li = document.createElement("li");
    li.innerHTML = `<input type= "checkbox">${item}<a href="#" class="remove">x</a><hr>`
    todoItems.append(li);

    localStorage.setItem(key, JSON.stringify(todoItems.html()));

    todoItem.val('');
  }
});


// when the event target is changed (box is checked) toggle "completed" class(strike through). Save changes to local storage.
todoItems.change(event => {
  event.target.parentElement.classList.toggle('completed');
  
  if (event.target.getAttribute('checked')) {
    event.target.removeAttribute('checked');
  } else {
    event.target.setAttribute('checked', null);
  }

  localStorage.setItem(key, JSON.stringify(todoItems.html()));
})

//When clicked element contains the "remove" class, remove it on click. Save updated list to local storage. Omitted creating if statements to assign true/false to hasRemoveClass variable.
todoItems.click(event => {
  if (event.target.classList.contains('remove')) {
    let li = event.target.parentElement;
    li.remove();
    localStorage.setItem(key, JSON.stringify(todoItems.html()));
  }
});


