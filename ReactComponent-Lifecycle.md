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

``` class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {favoritecolor: "red"};
  }
  render() {
    return (
      <h1>My Favorite Color is {this.state.favoritecolor}</h1>
    );
  }
}

ReactDOM.render(<Header />, document.getElementById('root'));```

Output: My favourite color is red

