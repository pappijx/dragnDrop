// import React from "react";
// import { Box, Flex } from "@chakra-ui/react";
// import TemplateEditor from "./TemplateEditor";

// const elementList = [
//   {
//     type: "Input",
//   },
// ];

// const App = () => {
//   return (
//     <Flex>
//       <TemplateEditor />
//     </Flex>
//   );
// };

// export default App;

import { Box, Flex } from "@chakra-ui/react";
import React, { useState } from "react";

function DraggableElement({ id, type, children, onDrop }) {
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const elementId = e.dataTransfer.getData("elementId");
    onDrop(id, elementId);
  };

  return (
    <Flex
      className={`draggable-element ${type}`}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      {type} {`->`}
      {children.map((child) => (
        <DraggableElement
          key={child.id}
          id={child.id}
          type={child.type}
          children={child.children}
          onDrop={onDrop}
        />
      ))}
    </Flex>
  );
}

function App() {
  const [templateElements, setTemplateElements] = useState([]);
  console.log(templateElements);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDropOuter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const elementId = e.dataTransfer.getData("elementId");
    const element = {
      id: Date.now(),
      type: elementId,
      x: e.clientX,
      y: e.clientY,
      children: [], // Store child elements here
    };
    setTemplateElements([...templateElements, element]);
  };

  const handleDrop = (parentId?: any, elementId?: any) => {
    console.log("red");
    const newChild = { id: Date.now(), type: elementId, children: [] };

    const updatedElements = updateTemplateElements(
      templateElements,
      parentId,
      newChild,
    );

    setTemplateElements(updatedElements);
  };

  const updateTemplateElements = (elements, parentId, newChild) => {
    return elements.map((element) => {
      if (element.id === parentId) {
        return {
          ...element,
          children: [...element.children, newChild],
        };
      }
      return {
        ...element,
        children: updateTemplateElements(element.children, parentId, newChild),
      };
    });
  };

  // arrange logic
  const onDragStartArrange = (e, index) => {
    e.stopPropagation();
    console.log(index);
    e.dataTransfer.setData("elementId", "image");
  };

  return (
    <Flex width="100%" gap="1rem">
      <Flex width="50%" className="App">
        <Flex
          width="100%"
          bgColor="red"
          paddingBottom="1rem"
          onDrop={handleDropOuter}
          onDragOver={handleDragOver}
          className="template-editor"
          direction="column"
        >
          {templateElements.map((element, index) => (
            <Box
              key={element.id}
              draggable={true}
              onDragStart={(e) => onDragStartArrange(e, index)}
              onDragOver={(e) => e.preventDefault()}
            >
              <DraggableElement
                id={element.id}
                type={element.type}
                children={element.children}
                onDrop={handleDrop}
              />
            </Box>
          ))}
        </Flex>
      </Flex>
      <Flex direction="column" gap="1rem" className="element-library">
        <Flex
          padding="0.5rem"
          bgColor="yellow"
          className="draggable-element"
          draggable="true"
          onDragStart={(e) => e.dataTransfer.setData("elementId", "text")}
        >
          Text Box
        </Flex>
        <Flex
          padding="0.5rem"
          bgColor="yellow"
          className="draggable-element"
          draggable="true"
          onDragStart={(e) => e.dataTransfer.setData("elementId", "image")}
        >
          Image
        </Flex>
        {/* Other draggable element types */}
      </Flex>
    </Flex>
  );
}

export default App;
