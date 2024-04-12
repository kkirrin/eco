import { useSelector } from 'react-redux'


export const useFilters = (select) => {

  // filters приходит из filtersReducer
  const  filters = useSelector(state => state.filters)
  return filters;
}
export const useCustomers = (select) => {

  const result = useSelector(state => state.customers)
  return result;
}

export const useMain = () => {

  const result = useSelector(state => state.main)
  return result;
}



export const useStater = (select) => {

  const state = useSelector(state => state)

  switch(select) {
    case 'pages': //Страницы
      const {pages} = state
      return pages

    case 'menu': //Навигация
      const {menu} = state
      return menu

    case 'slides': //Слайдер
      const {slides} = state
      return slides

    case 'partners':  //Партнеры
      const {partners} = state
      return partners

    case 'services': //Услуги
      const {service} = state
      return service

    case 'products': //Товары
      const {products} = state
      return products

    case 'category':
      const {category} = state
      return category

    case 'bestsales': //Самые продаваемые
      const {bestsales} = state
      return bestsales

    case 'cart': //Корзина
      const {cart} = state
      return cart

    case 'user': //Пользователь
      const {user} = state
      return user

    case 'deliveriesTerms': //Способы доставки и оплаты
      const {deliveriesTerms} = state
      return deliveriesTerms

    default:
      //console.log('Неопознанный вызов состояния');
      return false;
  }

}
