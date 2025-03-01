"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface Card {
  id: string;
  name: string;
  Cards: Card[];
}

const iniTialCards: Card[] = [
  {
    id: "root",
    name: "Root Card",
    Cards: [
      {
        id: "card1",
        name: "Card 1",
        Cards: [
          {
            id: "card11",
            name: "Card 11",
            Cards: [
              {
                id: "card111",
                name: "Card 111",
                Cards: [
                  {
                    id: "card1111",
                    name: "Card 1111",
                    Cards: [],
                  },
                  {
                    id: "card1112",
                    name: "Card 1112",
                    Cards: [],
                  },
                ],
              },
            ],
          },
          {
            id: "card112",
            name: "Card 112",
            Cards: [],
          },
        ],
      },
      {
        id: "card2",
        name: "Card 2",
        Cards: [],
      },
      {
        id: "card3",
        name: "Card 3",
        Cards: [],
      },
      {
        id: "card4",
        name: "Card 4",
        Cards: [],
      },
    ],
  },
];

const NestedCard01 = () => {
  const [cardItems, setCardItems] = useState<Card[]>(iniTialCards);

  // Recursive function to add a sub-card to the correct parent
  const addCardToParent = (cards: Card[], parentId: string): Card[] => {
    return cards.map((card) => {
      if (card.id === parentId) {
        return {
          ...card,
          Cards: [...card.Cards, { id: uuidv4(), name: "New Card", Cards: [] }],
        };
      }
      return { ...card, Cards: addCardToParent(card.Cards, parentId) };
    });
  };

  const handleAddNewCard = (parentId: string) => {
    setCardItems((prev) => addCardToParent(prev, parentId));
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-4">
      <h1 className="text-xl font-bold">Card List</h1>

      <div className="space-y-2 w-full max-w-xl mx-auto">
        {cardItems.map((card) => (
          <CardComponent
            key={card.id}
            card={card}
            handleAddNewCard={handleAddNewCard}
          />
        ))}
      </div>
    </div>
  );
};

function CardComponent({
  card,
  handleAddNewCard,
}: {
  card: Card;
  handleAddNewCard: (parentId: string) => void;
}) {
  return (
    <div className="p-5 w-full rounded-md border">
      <div className="bg-red-400 p-2 rounded-md text-white">
        <p className="font-semibold">{card.name}</p>
      </div>

      <div className="ml-5 mt-2 border-l-2 pl-3 space-y-2">
        {card.Cards.map((subCard) => (
          <CardComponent
            key={subCard.id}
            card={subCard}
            handleAddNewCard={handleAddNewCard}
          />
        ))}
      </div>
      {card.Cards.length > 1 && (
        <button
          onClick={() => handleAddNewCard(card.id)}
          className="bg-blue-500 text-white px-3 py-1 mt-2 rounded-sm cursor-pointer"
        >
          Add New Card
        </button>
      )}
    </div>
  );
}

export default NestedCard01;
