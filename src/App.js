import React, { Component } from 'react';
import marked from 'marked';
import './App.css';

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});

const instructions = `### Markdown Examples\n\n
*italics* **bold** \`monospace\` ~~strikethrough~~\n\n
Press Enter twice to create a paragraph\n\n
[more examples](https://guides.github.com/features/mastering-markdown/)`

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: instructions,
      translation: {
        __html: marked(instructions),
      },
    }

    this.translateInput = this.translateInput.bind(this);
  }

  translateInput(event) {
    this.setState({
      input: event.target.value,
      translation: {
        __html: marked(event.target.value),
      }
    });
  }

  render() {
    const {
      input,
      translation
    } = this.state;

    return (
      <div>
        <Input
          onChange={this.translateInput}
          value={input}
        />
        <Output translation={translation} />
      </div>
    );
  }
}

const Input = ({ value, onChange }) =>
  <div className="App-Input">
    <form>
      <textarea
        onChange={onChange}
        value={value}
      />
    </form>
  </div>

const Output = ({ translation }) =>
    <div
      className="App-Output"
      dangerouslySetInnerHTML={translation}
    />

export default App;
