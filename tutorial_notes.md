## Arrow functions
> Notice how with onClick={() => alert('click')}, we’re passing a function as the onClick prop. It only fires after a click. Forgetting () => and writing onClick={alert('click')} is a common mistake, and would fire the alert every time the component re-renders.


https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions


EX. `onClick={() => alert('click')}`


## Constructors
> In JavaScript classes, you need to always call super when defining the constructor of a subclass. All React component classes that have a constructor should start it with a super(props) call.
