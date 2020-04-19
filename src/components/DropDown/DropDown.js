import React, { Component } from 'react';
import DropDownContent from './DropDownContent';

export default class DropDown extends Component {
  constructor() {
    super();
    this.state = {
      list: [
        {
          title: '',
        },
      ],
      term: '',
      empty: [
        {
          title: '',
        },
      ],
      selected: 'A',
    };
    this.searchHandler = this.searchHandler.bind(this);
    this.handlerClick = this.handlerClick.bind(this);
  }

  searchHandler(event) {
    // Тут запрос на сервер
    const serverData = [
      {
        title: 'Stranger Things',
      },
      {
        title: 'Money Heist',
      },
      {
        title: 'Rick and Morty',
      },
      {
        title: 'Ozark',
      },
      {
        title: 'Altered Carbon',
      },
      {
        title: 'Dark',
      },
    ];
    this.setState({ term: event.target.value, list: serverData });
  }

  handlerClick(item) {
    // Тут сохраняю в state выбрвнный элемент
    const selectedItem = this.state.list.filter((x) => x.title === item);
    this.setState({
      term: item,
      list: this.state.empty,
      selected: selectedItem,
    });
  }

  render() {
    const { term } = this.state;
    return (
      <div>
        <div className="input-group input-group-lg">
          <input
            type="text"
            className="form-control"
            aria-label="Large"
            placeholder="Выбор данных"
            aria-describedby="inputGroup-sizing-sm"
            onChange={this.searchHandler}
            onClick={this.searchHandler}
            value={term}
          />
        </div>
        <DropDownContent
          title="Select Series"
          list={this.state.list}
          onClick={this.handlerClick}
          term={term}
        />
      </div>
    );
  }
}
