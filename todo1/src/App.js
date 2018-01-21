import React from 'react'
import { Container, Header, Input, List, Checkbox, Button, Segment } from 'semantic-ui-react'

export default class App extends React.Component {
  state = {
    todoText: '',
    todoList: [],
    filter: 'all'
  }
  handleChange = (e) => {
    this.setState({
      todoText: e.target.value
    })
  }
  addChange = (e) => {
    e.preventDefault()
    if (this.state.todoText.trim().length) {
      const newTodo = {
        id: Math.floor(Math.random() * 100000),
        text: this.state.todoText,
        checked: false
      }
      this.setState({
        todoList: [...this.state.todoList, newTodo],
        todoText: ''
      })
    }

  }
  toggleTodo = (todo) => {
    const newTodo = {
      id: todo.id,
      text: todo.text,
      checked: !todo.checked
    }
    //find position of this todo in the list
    const i = this.state.todoList.indexOf(todo)
    // create a new list like item 0 to item [n], newItem, item [n+1] to last item
    const newList = [...this.state.todoList.slice(0, i), newTodo, ...this.state.todoList.slice(i + 1)]
    //setstate todolist with newlist
    this.setState({
      todoList: newList
    })
  }
  delItem = (item) => {
    const index = this.state.todoList.indexOf(item)
    const newList = [...this.state.todoList.slice(0, index), ...this.state.todoList.slice(index + 1)]
    this.setState({
      todoList: newList
    })
  }
  setFilter = (filterType) => {
    this.setState({
      filter: filterType
    })
  }
  render() {
    return (
      <Container text>
        <Header as='h2'>TodoList</Header>
        <form onSubmit={(e) => this.addChange(e)} >
          <Input placeholder='Add todo...' autoFocus value={this.state.todoText} onChange={this.handleChange} />
          <Button secondary basic onClick={this.addChange}>Add</Button>
        </form>
        <List>
          {this.state.todoList.map(
            (item, index) => {
              switch (this.state.filter) {
                case 'pending':
                  if (item.checked === false) {
                    return (
                      <List.Item key={index}>
                        <Checkbox
                          slider
                          label={{ children: item.text }}
                          checked={item.checked}
                          onChange={() => this.toggleTodo(item)}
                        />
                        <Button secondary floated='right' icon='trash outline' onClick={() => this.delItem(item)}></Button>
                      </List.Item>
                    )
                  }
                  break;
                case 'completed':
                  if (item.checked === true) {
                    return (
                      <List.Item key={index}>
                        <Checkbox
                          slider
                          label={{ children: item.text }}
                          checked={item.checked}
                          onChange={() => this.toggleTodo(item)}
                        />
                        <Button secondary floated='right' icon='trash outline' onClick={() => this.delItem(item)}></Button>
                      </List.Item>
                    )
                  }
                  break;
                default:
                  return (
                    <List.Item key={index}>
                      <Checkbox
                        slider
                        label={{ children: item.text }}
                        checked={item.checked}
                        onChange={() => this.toggleTodo(item)}
                      />
                      <Button secondary floated='right' icon='trash outline' onClick={() => this.delItem(item)}></Button>
                    </List.Item>
                  )
              }
            }

          )}

          {this.props.children}
        </List>
        {this.state.todoList.length
          ? <div>
            <Button.Group>
              <Button onClick={() => this.setFilter('all')} positive={this.state.filter === 'all' ? true : false}>Vew All</Button>
              <Button.Or />
              <Button onClick={() => this.setFilter('completed')} positive={this.state.filter === 'completed' ? true : false}>View Completed</Button>
              <Button.Or />
              <Button onClick={() => this.setFilter('pending')} positive={this.state.filter === 'pending' ? true : false}>View Pending</Button>
            </Button.Group>
            <Segment>
              you have {this.state.todoList.length} tasks of which
                {' ' + this.state.todoList.filter((todo) => todo.checked === false).length + ' '}
              are pending
            </Segment>
          </div>
          : <div>No items in this list </div>
        }
      </Container>
    )
  }
}