import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./styles.css";

const finalSpaceCharacters = [
  {
    id: "leonard",
    name: "Leonard",
    thumb:
      "https://pbs.twimg.com/profile_images/2654852680/87ee5ed912ea7364a29a380be9b22285.jpeg"
  },
  {
    id: "sheldon",
    name: "Sheldon",
    thumb: "https://www.tvovermind.com/wp-content/uploads/2017/06/Sheldon-1.jpg"
  },
  {
    id: "howard",
    name: "Howard",
    thumb:
      "https://images-na.ssl-images-amazon.com/images/I/41tkYBPbVnL._AC_.jpg"
  },
  {
    id: "raj",
    name: "Raj",
    thumb:
      "https://upload.wikimedia.org/wikipedia/en/thumb/a/a1/Rajesh_Koothrappali.jpg/220px-Rajesh_Koothrappali.jpg"
  },
  {
    id: "penny",
    name: "Penny",
    thumb:
      "https://upload.wikimedia.org/wikipedia/en/4/41/Penny_bigbangtheory.jpg"
  }
];

function App() {
  const [characters, updateCharacters] = useState(finalSpaceCharacters);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Big Bang Theory Characters</h1>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
              <ul
                className="characters"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {characters.map(({ id, name, thumb }, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div className="characters-thumb">
                            <img src={thumb} alt={`${name} Thumb`} />
                          </div>
                          <p>{name}</p>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </header>
      <p>
        Images from{" "}
        <a href="https://en.wikipedia.org/wiki/The_Big_Bang_Theory">
          TheBigBangTheory
        </a>
      </p>
    </div>
  );
}

export default App;
