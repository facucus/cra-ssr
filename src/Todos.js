import React from "react";
import loadData from "./helpers/loadData";
import Helmet from "react-helmet";
import { connect } from "react-redux";

import { getTodos } from "./store/reducers";

class Todos extends React.Component {
  constructor(props) {
    super(props);

    if (props.staticContext && props.staticContext.data) {
      this.state = {
        data: props.staticContext.data
      };
    } else {
      this.state = {
        data: []
      };
    }
  }

  componentDidMount() {
    const { todos, onGetTodos } = this.props;
    if (!todos.length) {
      onGetTodos();
    }
  }

  render() {
    const { data } = this.state;
    const { todos } = this.props;
    console.log("todos: ", todos);
    return (
      <div>
        <Helmet>
          <title>{todos.length ? todos[0].title : "Turbo todo"}</title>
          <meta name="description" content="Todos on steroid!" />
        </Helmet>
        <h1>Todos!!!</h1>
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  todos: state.app.todos
});

const mapDispatchToProps = dispatch => ({
  onGetTodos: () => dispatch(getTodos())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todos);
