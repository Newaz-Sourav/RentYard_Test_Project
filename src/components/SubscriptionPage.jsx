import React, { useState, useEffect } from 'react';
import AddCardModal from './AddCardModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectPlan,
  selectCard,
  selectBillingCycle,
  addCard,
} from './subscriptionSlice';
import { selectTotal } from './subscriptionSlice';
import creditCard from '../assets/images/creditCard.png';
import VectorPay from '../assets/images/VectorPay.png';

export default function SubscriptionPage() {
  const dispatch = useDispatch();
  const {
    selectedPlan,
    autoPay,
    selectedCardId,
    billingCycle,
    cards,
  } = useSelector((state) => state.subscription);

  const total = useSelector(selectTotal);
  const [showAddCard, setShowAddCard] = useState(false);

  const handlePlanSelect = (plan) => dispatch(selectPlan(plan));
  const handleCardSelect = (id) => dispatch(selectCard(id));
  const handleCycleChange = (cycle) => dispatch(selectBillingCycle(cycle));

  const handleCardSave = (cardInfo) => {
    const last4 = cardInfo.number.slice(-4);
    dispatch(addCard({
      holder: cardInfo.name,
      brand: 'Amex',
      last4: last4,
    }));
    setShowAddCard(false);
  };

  // ✅ Automatically select the first card
  useEffect(() => {
    if (!selectedCardId && cards.length > 0) {
      dispatch(selectCard(cards[0].id));
    }
  }, [cards, selectedCardId, dispatch]);

  return (
    <div className="rounded-[8px] px-[16px] py-[16px] mx-[80px] mt-[20px] mb-[4rem] flex gap-[24px] flex-col">
      {/* Title */}
      <div className="flex justify-between pb-[8px] items-center">
        <h2 className="text-[20px] font-[700] text-[#272B35]">
          Choose a plan for after 30-days free trial
        </h2>
      </div>

      {/* Billing cycle toggle */}
      <div className="w-fit border border-[#E0E0E0] rounded-[10px] p-[6px]">
        {['monthly', 'annually'].map((cycle) => (
          <button
            key={cycle}
            onClick={() => handleCycleChange(cycle)}
            className={`px-[20px] py-[11px] cursor-pointer rounded-[10px] font-[700] text-[14px] ${
              billingCycle === cycle
                ? 'bg-[#EEF4FF] text-[#316EED]'
                : 'text-[#272B35]'
            }`}
          >
            {cycle === 'monthly' ? 'Monthly' : 'Annually (save 57%)'}
          </button>
        ))}
      </div>

      {/* Plan cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pb-[16px] gap-4">
        {['regular', 'platinum', 'enterprize'].map((plan) => {
          const planNames = {
            regular: 'Regular',
            platinum: 'Platinum',
            enterprize: 'Enterprize',
          };
          const pricing = {
            monthly: { regular: 99.99, platinum: 129.99, enterprize: 199.99 },
            annually: { regular: 429.0, platinum: 529.0, enterprize: 749.0 },
          };
          const price = pricing[billingCycle][plan];

          return (
            <div
              key={plan}
              onClick={() => handlePlanSelect(plan)}
              className={`p-[24px] rounded-[10px] border cursor-pointer ${
                selectedPlan === plan
                  ? 'border-[#316EED] bg-[#F5F8FF]'
                  : 'border-[#D8D8D8]'
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <div
                  className={`border-[0.5px] border-[#D8D8D8] rounded-[6px] px-[16px] py-[12px] ${
                    selectedPlan === plan ? '' : 'bg-[#F4F4F4]'
                  }`}
                >
                  <h3 className="text-[20px] text-[#272B35] font-[700]">
                    {planNames[plan]}
                  </h3>
                </div>
                {selectedPlan === plan && autoPay && (
                  <div className="flex gap-[8px] py-[14px] px-[16px] rounded-[12px] justify-center items-center border border-[#E0E0E0]">
                    <div className="border-[1.5px] flex justify-center items-center w-[19px] h-[19px] rounded-[4px] border-[#316EED]">
                      <img src={VectorPay} className="h-[6px] w-[8px]" alt="" />
                    </div>
                    <span className="text-[16px] font-[700] text-[#316EED]">
                      Auto Pay
                    </span>
                  </div>
                )}
              </div>
              <p className="text-[48px] text-[#272B35] font-[700]">
                ${price.toFixed(2)}
                <span className="text-[22px] text-[#6F6C6A] font-[500]">/mo</span>
              </p>
              <p className="text-[16px] font-[400] text-[#4C4A54] mt-[10px]">
                Price for 1-50 unit
              </p>
            </div>
          );
        })}
      </div>

      {/* Payment Section */}
      <div className="shadow-md border-t border-t-[#2E2D740D] rounded-[6px]">
        <div className="flex flex-wrap justify-between items-center px-[16px] pb-[10px] pt-[16px]">
          <h3 className="font-[700] text-[20px] text-[#272B35]">Payment option</h3>
          <button
            onClick={() => setShowAddCard(true)}
            className="font-[600] text-[16px] underline text-[#316EED]"
          >
            Add new card
          </button>
        </div>

        <div className="flex flex-col py-[10px]">
          {cards.map((card, index) => (
            <div
              key={card.id}
              className={`flex flex-wrap gap-[5px] px-[16px] py-[10px] justify-between items-center ${
                index !== cards.length - 1 ? 'border-b border-[#F0F1F3]' : ''
              }`}
            >
              <div className="flex items-center gap-[10px]">
                <img src={creditCard} className="w-[24px] h-[24px]" alt="card" />
                <p className="text-[16px] font-[600] text-[#272B35]">
                  {card.holder} ({card.brand})
                  <span className="text-[16px] font-[500] text-[#6F6C6A] pl-[10px]">
                    ****{card.last4}
                  </span>
                </p>
              </div>
              <button
                onClick={() => handleCardSelect(card.id)}
                className={`text-[16px] font-[700] px-[20px] py-[10px] rounded-[12px] border ${
                  selectedCardId === card.id
                    ? 'bg-[#316EED] text-white'
                    : 'text-[#316EED] border-[#316EED]'
                }`}
              >
                Select
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showAddCard && (
        <AddCardModal
          onClose={() => setShowAddCard(false)}
          onSave={handleCardSave}
        />
      )}
    </div>
  );
}
