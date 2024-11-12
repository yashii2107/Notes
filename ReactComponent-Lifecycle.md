React Components Life Cycle Methods

The three phases are:
**Mounting, Updating, and Unmounting.**

When Mounting a component, 4 methods get called :

**1. **Constructor()**
 2. **getDerivedStateFromProps()**
 3. **render()**
 4. **componentDidMount()** 

 render() will always be called and other are optional and will be called when you define them

1. Constructor()
The constructor method is called, by React, every time you make a component, it is called with props as argument.
nd you should always start by calling the super(props) before anything else, this will initiate the parent's constructor method and allows the component to inherit methods from its parent (React.Component).

<pre>``` class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {favoritecolor: "red"};
  }
  render() {
    return (
      <!-- <h1>My Favorite Color is {this.state.favoritecolor}</h1> -->
    );
  }
}

ReactDOM.render(<Header />, document.getElementById('root'));
</pre>
Output: My favourite color is red


2. getDerivedStateFromProps()

The getDerivedStateFromProps() method is called right before rendering the element(s) in the DOM.
It takes state as an argument, and returns an object with changes to the state.

<pre>
``` class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {favoritecolor: "red"};
  }
  static getDerivedStateFromProps(props, state) {
    return {favoritecolor: props.favcol };
  }
  render() {
    return (
      {<h1>My Favorite Color is {this.state.favoritecolor}</h1>}
    );
  }
}

ReactDOM.render(<Header favcol="yellow"/>, document.getElementById('root'));
</pre>

Output: My favourite Color is yellow


3. render()
render() method is required, and is the method that actually outputs the HTML to the DOM.(can see in above example)

4. componentDidMount

The componentDidMount() method is called after the component is rendered.
This is where you run statements that requires that the component is already placed in the DOM.

**Example**

<pre>
```
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {favoritecolor: "red"};
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({favoritecolor: "yellow"})
    }, 1000)
  }
  render() {
    return (
      {<h1>My Favorite Color is {this.state.favoritecolor}</h1>}
    );
  }
}

ReactDOM.render(<Header />, document.getElementById('root'));
</pre>

output: here after render the color after one sec will change



