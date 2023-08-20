import React, { useState } from "react";
import DraggableElement from "./DraggableElement";
import { Flex } from "@chakra-ui/react";

function TemplateEditor() {
  const [templateElements, setTemplateElements] = useState([]);
  console.log(templateElements);

  const handleDrop = (e) => {
    console.log("inside parent");

    e.preventDefault();
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

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const removeElement = (id) => {
    const updatedElements = templateElements.filter(
      (element) => element.id !== id,
    );
    setTemplateElements(updatedElements);
  };

  return (
    <Flex width="100%">
      <Flex
        direction="column"
        bgColor="gray.500"
        width="200px"
        className="element-library"
      >
        <div
          className="draggable-element"
          draggable="true"
          onDragStart={(e) => e.dataTransfer.setData("elementId", "text")}
        >
          Text Box
        </div>
        <div
          className="draggable-element"
          draggable="true"
          onDragStart={(e) => e.dataTransfer.setData("elementId", "image")}
        >
          Image
        </div>
        <div
          className="draggable-element"
          draggable="true"
          onDragStart={(e) => e.dataTransfer.setData("elementId", "section")}
        >
          Section
        </div>
        {/* Other draggable element types */}
      </Flex>
      <Flex
        className="template-editor"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        width="100%"
        bgColor="red"
      >
        <div className="template-canvas">
          {templateElements.map((element, index) => (
            <DraggableElement
              key={element.id}
              element={element}
              itemLocation={[index]}
              templateElements={templateElements}
              setTemplateElements={setTemplateElements}
              onRemove={removeElement}
            />
          ))}
        </div>
      </Flex>
    </Flex>
  );
}

export default TemplateEditor;
