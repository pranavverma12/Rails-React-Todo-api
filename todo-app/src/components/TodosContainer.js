import React, { Component } from 'react'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import update from 'immutability-helper'
import ReactTimeAgo from 'react-time-ago'

class TodosContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: []
    }
  }

  getTodos() {
    axios.get('/api/v1/todos')
    .then(response => {
      this.setState({todos: response.data})
    })
    .catch(error => console.log(error))
  }

  componentDidMount() {
    this.getTodos()
  }

  createTodo = (event) => {
    const data = new FormData(event.target);
    axios.post('/api/v1/todos', {todo: {title: data.get('title'), description: data.get('description')}})
    .then(response => {
      const todos = update(this.state.todos, {
        $splice: [[0, 0, response.data]]
      })
      this.setState({
        todos: todos,
        inputValue: ''
      })
    })
    .catch(error => console.log(error))
  }

  updateTodo = (event, id) =>{
    axios.put("api/v1/todos/" + id, {todo: {completed: event.target.checked}})
    .then(response => {
      const todoIndex = this.state.todos.findIndex(x => x.id === response.data.id)
      const todos = update(this.state.todos, {
        [todoIndex]: {$set: response.data}
      })
      this.setState({
        todos: todos
      })
    })
    .catch(error => console.log(error))
  }

  deleteTodo = (id) => {
    axios.delete('api/v1/todos/' + id)
    .then( response =>{
      const todoIndex = this.state.todos.findIndex(x => x.id === response.data.id)
      const todos = update(this.state.todos, {
        $splice: [[todoIndex, 1]]
      })
      this.setState({
        todos: todos
      })
    })
    .catch(error => console.log(error))
  }


  render() {
    return (
      <div>
        <div className="inputContainer">
          <Form onSubmit={this.createTodo}>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridTitle">
                <Form.Label>Email</Form.Label>
                <Form.Control name="title" placeholder="Enter Title" />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control name="description" placeholder="Enter Description" />
              </Form.Group>
            </Form.Row>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>

        </div>

        <div>
          <CardDeck>
            { this.state.todos.map((todo) => {
              return(
                <Card key={todo.id} className = {todo.completed ? 'completed_task': null}>
                  <Card.Body>
                    <Card.Title>{todo.title}</Card.Title>
                    <Card.Text>{todo.description}</Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted"> <ReactTimeAgo date={todo.created_at} /></small>
                    <div className='custom-control custom-switch'>
                      <input className="custom-control-input" type="checkbox" 
                        checked={todo.completed}
                        name="completed"
                        id={todo.id}
                        onChange={(e) => this.updateTodo(e, todo.id)} /> 
                      <label className='custom-control-label' htmlFor={todo.id}>
                        Completed?
                      </label>
                    </div>
                    <span onClick={(e) => this.deleteTodo(todo.id)}><i className="fa fa-trash"></i></span>
                  </Card.Footer>
                </Card>
              )
            })}
          </CardDeck>
        </div>
      </div>
    )
  }
}

export default TodosContainer
