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
      &lt;h1&gt;My Favorite Color is {this.state.favoritecolor}&lt;/h1&gt;
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
      &lt;h1&gt;My Favorite Color is {this.state.favoritecolor}&lt;/h1&gt;
    ); 
  }
}

ReactDOM.render(<Header />, document.getElementById('root'));
</pre>

output: here after render the color after one sec will change

**Updating Phase** (second phase)

A component is updated whenever there is a change in the component's state or props.

React has five built-in methods that gets called, in this order, when a component is updated:

1.getDerivedStateFromProps()
2.shouldComponentUpdate()
3.render()
4.getSnapshotBeforeUpdate()
5.componentDidUpdate()


**getDerivedStateFromProps()**

<pre>
```
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {favoritecolor: "red"};
  }
  static getDerivedStateFromProps(props, state) {
    return {favoritecolor: props.favcol };
  }
  changeColor = () => {
    this.setState({favoritecolor: "blue"});
  }
  render() {
    return (
      <div>
      &lt;h1&gt;My Favorite Color is {this.state.favoritecolor}&lt;/h1&gt;
&lt;button&gt;type="button" onClick={this.changeColor}>Change color&lt;/button&gt;
      </div>
    );
  }
}

ReactDOM.render(<Header favcol="yellow"/>, document.getElementById('root'));
</pre>

output : My fav color is yellow (here on clicking color will not change to blue)

**shouldComponentUpdate()**

In the shouldComponentUpdate() method you can return a Boolean value that specifies whether React should continue with the rendering or not.

The default value is true.

<pre>
```
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {favoritecolor: "red"};
  }
  shouldComponentUpdate() {
    return false;
  }
  changeColor = () => {
    this.setState({favoritecolor: "blue"});
  }
  render() {
    return (
      <div>
      &lt;h1&gt;My Favorite Color is {this.state.favoritecolor}&lt;/h1&gt;
      &lt;button&gt;type="button" onClick={this.changeColor}>Change color&lt;/button&gt;
       
      </div>
    );
  }
}

ReactDOM.render(<Header />, document.getElementById('root'));
</pre>

output: here shouldComponentUpdate value is false so component will not render and colorwill not change on clicking button


**reder()**

The render() method is of course called when a component gets updated, it has to re-render the HTML to the DOM, with the new changes.


**getSnapshotBeforeUpdate()**

In the getSnapshotBeforeUpdate() method you have access to the props and state before the update, meaning that even after the update, you can check what the values were before the update.

If the getSnapshotBeforeUpdate() method is present, you should also include the componentDidUpdate() method, otherwise you will get an error.


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
  getSnapshotBeforeUpdate(prevProps, prevState) {
    document.getElementById("div1").innerHTML =
    "Before the update, the favorite was " + prevState.favoritecolor;
  }
  componentDidUpdate() {
    document.getElementById("div2").innerHTML =
    "The updated favorite is " + this.state.favoritecolor;
  }
  render() {
    return (
      <div>
       &lt;h1 &gt;My Favorite Color is {this.state.favoritecolor}&lt;/h1&gt;
        <div id="div1"></div>
        <div id="div2"></div>
      </div>
    );
  }
}

ReactDOM.render(<Header />, document.getElementById('root'));

</pre>

output: div1 =>My favourite color is red
div2 => yellow


**componentDidUpdate()**

The componentDidUpdate method is called after the component is updated in the DOM.

This action triggers the update phase, and since this component has a componentDidUpdate method, this method is executed and writes a message in the empty DIV element:

refer to above exampple



**Unmounting**

The next phase in the lifecycle is when a component is removed from the DOM, or unmounting as React likes to call it.

React has only one built-in method that gets called when a component is unmounted:

componentWillUnmount()

<pre>

```
import React from 'react';
import ReactDOM from 'react-dom/client';

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {show: true};
  }
  delHeader = () => {
    this.setState({show: false});
  }
  render() {
    let myheader;
    if (this.state.show) {
      myheader = <Child />;
    };
    return (
      <div>
      {myheader}
      &lt;button&gt;type="button" onClick={this.delHeader}>Delete Header&lt;/button&gt;
     
      </div>
    );
  }
}

class Child extends React.Component {
  componentWillUnmount() {
    alert("The component named Header is about to be unmounted.");
  }
  render() {
    return (
     &lt;h1&gt; hello world &lt;/h1&gt;
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Container />);
</pre>