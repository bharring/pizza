import reducer, * as pizza from './pizza';

jest.mock('uuid/v4', () => jest.fn(() => '2e774a36-408c-4247-83a1-a59d212ad1bd'));

describe('pizza reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(pizza.defaultState);
  });
  it('should set isFetching', () => {
    expect(reducer(pizza.defaultState, { type: pizza.REQUEST_PENDING })).toEqual({
      ...pizza.defaultState,
      isFetching: true,
    });
  });
  it('should clear isFetching', () => {
    expect(
      reducer(
        {
          ...pizza.defaultState,
          isFetching: true,
        },
        { type: pizza.REQUEST_COMPLETED },
      ),
    ).toEqual({
      ...pizza.defaultState,
      isFetching: false,
    });
  });
  it('should save error and clear isFetching', () => {
    expect(
      reducer(
        {
          ...pizza.defaultState,
          isFetching: true,
        },
        { type: pizza.REQUEST_FAILED, error: 'error' },
      ),
    ).toEqual({
      ...pizza.defaultState,
      isFetching: false,
      error: 'error',
    });
  });
  it('should save pizza sizes', () => {
    const pizzas = [
      { name: 'small', maxToppings: 3, basePrice: 9.89 },
      { name: 'medium', maxToppings: 5, basePrice: 10.89 },
      { name: 'large', maxToppings: null, basePrice: 13.49 },
    ];
    expect(reducer(pizza.defaultState, { type: pizza.RECEIVE_PIZZA_SIZES, pizzas })).toEqual({
      ...pizza.defaultState,
      pizzas,
    });
  });
  it('should save pizza size, and default toppings to order as well as pizza menu toppings for size', () => {
    const size = { name: 'small', maxToppings: 3, basePrice: 9.89 };
    const toppings = [
      { defaultSelected: false, topping: { name: 'pepperoni', price: 0.4 } },
      { defaultSelected: false, topping: { name: 'bannana peps', price: 0.89 } },
      { defaultSelected: false, topping: { name: 'sausage', price: 1.29 } },
      { defaultSelected: false, topping: { name: 'onion', price: 0.29 } },
      { defaultSelected: false, topping: { name: 'green olives', price: 0.39 } },
      { defaultSelected: true, topping: { name: 'cheese', price: 0.1 } },
      { defaultSelected: false, topping: { name: 'bell peps', price: 0.22 } },
    ];
    expect(
      reducer(pizza.defaultState, { type: pizza.RECEIVE_TOPPINGS_FOR_SIZE, size, toppings }),
    ).toEqual({
      ...pizza.defaultState,
      order: {
        size,
        toppings: [{ name: 'cheese', price: 0.1 }],
      },
      toppings,
    });
  });
  it('should add a topping to the current order', () => {
    expect(
      reducer(
        {
          ...pizza.defaultState,
          order: {
            toppings: [{ name: 'pepperoni', price: 0.4 }, { name: 'cheese', price: 0.1 }],
          },
        },
        { type: pizza.ADD_TOPPING_TO_ORDER, topping: { name: 'bell peps', price: 0.22 } },
      ),
    ).toEqual({
      ...pizza.defaultState,
      order: {
        toppings: [
          { name: 'pepperoni', price: 0.4 },
          { name: 'cheese', price: 0.1 },
          { name: 'bell peps', price: 0.22 },
        ],
      },
    });
  });
  it('should remove a topping from the current order', () => {
    expect(
      reducer(
        {
          ...pizza.defaultState,
          order: {
            toppings: [
              { name: 'pepperoni', price: 0.4 },
              { name: 'cheese', price: 0.1 },
              { name: 'bell peps', price: 0.22 },
            ],
          },
        },
        { type: pizza.REMOVE_TOPPING_FROM_ORDER, topping: { name: 'bell peps', price: 0.22 } },
      ),
    ).toEqual({
      ...pizza.defaultState,
      order: {
        toppings: [{ name: 'pepperoni', price: 0.4 }, { name: 'cheese', price: 0.1 }],
      },
    });
  });
  it('should add current order to the cart', () => {
    const order = {
      toppings: [{ name: 'cheese', price: 0.1 }],
      size: { name: 'small', maxToppings: 3, basePrice: 9.89 },
    };
    expect(
      reducer(
        {
          ...pizza.defaultState,
          order,
        },
        { type: pizza.COMPLETE_PIZZA },
      ),
    ).toEqual({
      ...pizza.defaultState,
      order,
      cart: [{ ...order, id: '2e774a36-408c-4247-83a1-a59d212ad1bd' }],
    });
  });
  it('should remove selected order from the cart', () => {
    const order = {
      id: '2e774a36-408c-4247-83a1-a59d212ad1bd',
      toppings: [{ name: 'cheese', price: 0.1 }],
      size: { name: 'small', maxToppings: 3, basePrice: 9.89 },
    };
    expect(
      reducer(
        {
          ...pizza.defaultState,
          order,
        },
        {
          type: pizza.REMOVE_PIZZA,
          id: '2e774a36-408c-4247-83a1-a59d212ad1bd',
        },
      ),
    ).toEqual({
      ...pizza.defaultState,
      order,
      cart: [],
    });
  });
});
