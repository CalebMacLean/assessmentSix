### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?

  1. Async/Await functions.
  2. Then/Catch chaining with Promises.
  3. Callback functions can also be used.

- What is a Promise?

  **Promises** are objects representing the eventual completion or failure of an asynchronous operation.

- What are the differences between an async function and a regular function?

  An **async function** has access to the **await** keyword, which allows for the function to wait on a value to return before continuing JavaScript's callstack. The inverse is true for **regular functions** which follow JavaScripts synchronous callstack order.

- What is the difference between Node.js and Express.js?

  **Node.JS** is a JS runtime built on Chrome's V8 JS engine. It essentially allows for a developer to run JavaScript on a server, outside of a browser. This functionality is enabled by a built-in HTTP module that can build servers without the use of external libraries.
  **Express.JS** on the other hand is a web application framework that can be used by *Node.JS*. Without *Express.JS*, *Node.JS* can be cumbersome with the amount of code required to construct complex APIs. *Express.JS* provides a simple API for building web apps that include features like middleware support, template engines, and routing. 

- What is the error-first callback pattern?

  The **Error-First Callback Pattern** is a common pattern for asynchronous code in *Node.JS*, which is why it is also referred to as a **Node-Style Callback**. In essence it is a programming convention where the first argument of a callback function is an error object, and the following arguments represent the successful response data. The convention is followed to ensure that errors are always properly handled, to make code more predictable, and to increase readability. 

- What is middleware?

  **Middleware** in *Express.JS* are functions that run in between the request/response cycle. This means that *Middleware* has access to the request object, response object, the next middleware function, can execute any code, and even end the request response cycle.

- What does the `next` function do?

  The **Next Function** is a flexible function that accesses the next middleware function in the stack. This functionality can be used to pass errors form *Route Handlers* to *Error Handlers* or move to the next middleware function.

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```

  This function has a few issues. We will disect the issues by category:

  - **Performance**: This function seperates its request to the api, meaning that the following request will not run until the previous request returns.

  - **Structure**: This function has alot of redundant code written. Each variable declaration uses await, the same base URL, requires the developer to remember to return all the variables within an array.

  So, how do we fix this? We can use *Promise.all()* to aggregate all the promises we want to resolve in a passed array. This would improve performance but also simplify error handling because *Promise.all()* will reject immediately once any of the passed promises are rejected. This allows programmers to handle errors from all promises in a single catch block. 
