//
/*










*/


//var cars;
class Car {
    constructor(src, x, y, isLeft, speed) {
        this.src = src;
        this.x = x
        this.y = y;
        this.isLeft = isLeft;
        this.speed = speed;
        //  cars = [];
        // todos = getFromLS(key);
    }
}


// class Todo {



//     addNewTodo(text, key) {
//         const newTodo = {
//             id: new Date(),
//             text: text,
//             completed: false
//         }
//         if (todos == null) {
//             todos = [];
//         }
//         newTodo.id = newTodo.id.toString();
//         todos.push(newTodo);
//         saveTodos(key);
//     }
//     grabTodos(key) {
//         return loadTodos(key);
//     }

//     completeTodo(todo) {
//         let complete = false;
//         for (let index = 0; index < todos.length; index++) {
//             const element = todos[index];
//             if (todos[index].id == todo.id) {
//                 if (todos[index].completed == false) {
//                     todos[index].completed = true;
//                     console.log("changed to true");
//                     todos[index].text.strike();
//                     complete = true;

//                 } else {
//                     todos[index].completed = false;

//                 }

//             }


//         }

//         saveTodos(this.key);
//         loadTodos(this.key);
//         return complete;
//     }



//     clearTodos() {

//     }

//     deleteTodo(element, index) {
//         let div = document.getElementById("div" + index);
//         div.remove();
//         todos.splice(index, 1);
//         saveTodos(this.key);
//     }



// }




export default Car;