import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  billingCycle: 'monthly', 
  selectedPlan: 'regular',
  autoPay: true,
  cards: [
    {
      id: nanoid(),
      holder: 'Alex Jones',
      brand: 'Amex',
      last4: '8565',
    },
    {
      id: nanoid(),
      holder: 'Alex Jones',
      brand: 'Amex',
      last4: '8565',
    },
    {
      id: nanoid(),
      holder: 'Alex Jones',
      brand: 'Amex',
      last4: '8565',
    },
  ],
  selectedCardId: null,
};

const PLAN_PRICING = {
  monthly: {
    regular: 99.99,
    platinum: 129.99,
    enterprize: 199.99,
  },
  annually: {
    regular: 429.0,
    platinum: 529.0,
    enterprize: 749.0,
  },
};

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    selectBillingCycle: (state, action) => {
      state.billingCycle = action.payload; 
    },
    selectPlan: (state, action) => {
      state.selectedPlan = action.payload;
    },
    toggleAutoPay: (state) => {
      state.autoPay = !state.autoPay;
    },
    selectCard: (state, action) => {
      state.selectedCardId = action.payload;
    },
    addCard: (state, action) => {
      state.cards.push({
        id: nanoid(),
        ...action.payload,
      });
    },
    removeCard: (state, action) => {
      const id = action.payload;
      state.cards = state.cards.filter((card) => card.id !== id);
      if (state.selectedCardId === id) {
        state.selectedCardId = null;
      }
    },
  },
});


export const {
  selectBillingCycle,
  selectPlan,
  toggleAutoPay,
  selectCard,
  addCard,
  removeCard,
} = subscriptionSlice.actions;


export const selectSubscription = (state) => state.subscription;

export const selectTotal = (state) =>
  PLAN_PRICING[state.subscription.billingCycle][state.subscription.selectedPlan];

export default subscriptionSlice.reducer;
