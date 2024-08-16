// Код разобран в предыдущем проекте, тут мы лишь рассмотрим 72 урок и сетевые запросы!
import React, { Component } from 'react';
import styles from './UsersLoader.module.scss';
// Выгружаем сетевые запросы
import { getUsers } from '../../api';
// Выгружаем лоадер
import Spinner from '../Spinner';
import PagginationBlock from '../PagginationBlock';
import NationOption from '../NationOption';
import LoadedUsersAmountRadiobutton from '../LoadedUsersAmountRadiobutton';
import User from '../User';
import CONSTANTS from '../../CONSTANTS';

class UsersLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isPending: false,
      error: null,
      currentPage: 1,
      currentResultsAmount: 5,
      currentNat: 'gb',
    };
  }

  componentDidMount() {
    this.load();
  }

  componentDidUpdate(prevProps, prevState) {
    // Делаем лоад, если из интерфейса выбрали фильтр на другой нации или запросили вывести другое количество результатов
    if (
      prevState.currentPage !== this.state.currentPage ||
      prevState.currentResultsAmount !== this.state.currentResultsAmount ||
      prevState.currentNat !== this.state.currentNat
    ) {
      this.load();
    }
  }

  // Обработчик изменения текущей страницы через пагинацию
  setCurrentPage = (newPage) => {
    this.setState({ currentPage: newPage });
  };

  load = () => {
    const { currentPage, currentResultsAmount, currentNat } = this.state;
    this.setState({ isPending: true });

    // Сетевой запрос
    getUsers({ page: currentPage, results: currentResultsAmount, nat: currentNat })
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

  // Обработчик выбора количества результатов - записываем количество в стейт!
  handleChangeResultsAmount = ({ target: { value } }) => {
    this.setState({ currentResultsAmount: Number(value) });
  };

  // Обработчик выбора национальности - записываем национальность в стейт!
  handleChangeNat = ({ target: { value } }) => {
    this.setState({ currentNat: value });
  };

  // Функция вывода юзеров
  showUsers = (user, i) => <User key={i} user={user} />;

  // Функция вывода опшинов селекта по национальностям
  showNatsOptions = (nat, i) => <NationOption key={i} nat={nat} />;

  // Функция вывода радиобаттонов количества выгружаемых юзеров
  showLoadedUsersAmountRadiobuttons = (amount, i) => {
    const { currentResultsAmount } = this.state;
    return (
      <LoadedUsersAmountRadiobutton
        key={i}
        value={amount}
        checked={currentResultsAmount === amount}
        handleChangeResultsAmount={this.handleChangeResultsAmount}
      />
    );
  };

  render() {
    // Выгружаем всё из стейта
    const { users, isPending, error, currentPage, currentNat } = this.state;
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
          {/* Блок пагинации */}
          <PagginationBlock
            currentPage={currentPage}
            setCurrentPage={this.setCurrentPage}
          />
          {/* Отображаем селект выбора национальности */}
          <select
            className={styles['nat']}
            name="nat"
            value={currentNat}
            onChange={this.handleChangeNat}
          >
            {CONSTANTS.NATS.map(this.showNatsOptions)}
          </select>
          {/* Отображаем радиобаттоны выбора количества выводимых результатов */}
          <div>
            {CONSTANTS.LOADED_USERS_RESULTS_AMOUNT.map(
              this.showLoadedUsersAmountRadiobuttons
            )}
          </div>
        </div>
        {/* Отображаем пользователей */}
        {users.length ? (
          <ul className={styles['users-container']}>
            {users.map(this.showUsers)}
          </ul>
        ) : (
          <p>empty list of users</p>
        )}
      </section>
    );
  }
}

export default UsersLoader;
