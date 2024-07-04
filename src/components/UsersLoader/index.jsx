// Код разобран в предыдущем проекте, тут мы лишь рассмотрим 72 урок и сетевые запросы!

import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Выгружаем сетевые запросы
import { getUsers } from '../../api';
// Выгружаем лоадер
import Spinner from '../Spinner';

const nats = ['us', 'dk', 'fr', 'gb'];

class UsersLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isPending: false,
      error: null,
      currentPage: 1,
      // Добавили переменные к сетевому запросу
      currentResults: 5,
      currentNat: 'gb',
    };
  }

  load = () => {
    const { currentPage, currentResults, currentNat } = this.state;
    this.setState({ isPending: true });
    // Сетевой запрос
    getUsers({ page: currentPage, results: currentResults, nat: currentNat })
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
        this.setState({ users: data.results });
      })
      .catch((error) => {
        this.setState({ error: error });
      })
      .finally(() => {
        this.setState({ isPending: false });
      });
  };

  componentDidMount() {
    this.load();
  }

  componentDidUpdate(prevProps, prevState) {
    // Делаем лоад, если из интерфайса выбрали фильтр на другой нации или запросили вывести другое количество результатов
    if (
      prevState.currentPage !== this.state.currentPage ||
      prevState.currentResults !== this.state.currentResults ||
      prevState.currentNat !== this.state.currentNat
    ) {
      this.load();
    }
  }

  showUsers = (user) => <li key={user.login.uuid}>{user.name.first}</li>;
  prevPage = () => {
    this.setState((state, props) => {
      const { currentPage } = state;
      if (currentPage > 1) {
        return { currentPage: currentPage - 1 };
      }
    });
  };
  nextPage = () => {
    this.setState((state, props) => {
      const { currentPage } = state;
      return { currentPage: currentPage + 1 };
    });
  };

    // Обработчик выбора количества результатов - записываем количество в стейт!
  handlerResults = ({ target: { value } }) => {
    this.setState({ currentResults: Number(value) });
  };

    // Обработчик выбора национальности - записываем национальность в стейт!
  handlerNat = ({ target: { value } }) => {
    this.setState({ currentNat: value });
  };

  // Обработчик вывода опшинов селекта по национальностям
  showOptions = (nat, i) => (
    <option key={i} value={nat}>
      {nat}
    </option>
  );

  render() {
    // Выгружаем всё из стейта
    const { users, isPending, error, currentPage, currentResults, currentNat } =
      this.state;
    if (isPending) {
      // Отображаем наш лоадер, вместо просто надписи
      return <Spinner />;
    }
    if (error) {
      return <div>ERROR!!!</div>;
    }
    return (
      <section>
        <h2>Users:</h2>
        <div>
          <button onClick={this.prevPage}>&lt; {/*&lt; - unicode */} </button>
          <span> {currentPage} </span>
          <button onClick={this.nextPage}>&gt;</button>
           {/* Отображаем селект выбора национальности */}
          <select name="nat" value={currentNat} onChange={this.handlerNat}>
            {nats.map(this.showOptions)}
          </select>
          <div>
            {/* Отображаем радиобаттоны выбора количества выводимых результатов */}
            <label>
              <input
                name="results"
                type="radio"
                value={5}
                checked={currentResults === 5}
                onChange={this.handlerResults}
              />
              5
            </label>
            <label>
              <input
                name="results"
                type="radio"
                value={10}
                checked={currentResults === 10}
                onChange={this.handlerResults}
              />
              10
            </label>
            <label>
              <input
                name="results"
                type="radio"
                value={15}
                checked={currentResults === 15}
                onChange={this.handlerResults}
              />
              15
            </label>
          </div>
        </div>
        {users.length ? (
          <ul>{users.map(this.showUsers)}</ul>
        ) : (
          <p>empty list of users</p>
        )}
      </section>
    );
  }
}

UsersLoader.propTypes = {};

export default UsersLoader;