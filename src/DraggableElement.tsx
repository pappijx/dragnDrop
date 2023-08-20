import { Box } from "@chakra-ui/react";
import React from "react";

function DraggableElement({
  element,
  templateElements,
  setTemplateElements,
  onRemove,
  itemLocation,
}) {
  const { id, type, children, x, y } = element;
  console.log(itemLocation);

  const handleDrag = (e) => {
    // Update element's position
  };

  const handleChildDrop = (e, parentId) => {
    console.log("inside child");
    e.preventDefault();
    e.stopPropagation();
    const elementId = e.dataTransfer.getData("elementId");
    const newChild = { id: Date.now(), type: elementId, children: [] };
    console.log("newChild", newChild);

    const updatedElements = templateElements.map((element) => {
      console.log("element.id === parentId", element.id === parentId);

      if (element.id === parentId) {
        return {
          ...element,
          children: [...element.children, newChild],
        };
      }
      return element;
    });
    console.log("updatedElements", updatedElements);

    setTemplateElements(updatedElements);
  };
  const removeElement = (id) => {
    const updatedElements = templateElements.filter(
      (element) => element.id !== id,
    );
    setTemplateElements(updatedElements);
  };
  return (
    <div
      className={`draggable-element ${type}`}
      style={{ top: y, left: x }}
      draggable="true"
      onDrag={(e) => handleDrag(e)}
    >
      <div className="element-content">
        {/* Other child element types */}
        <div
          className="child-elements"
          onDrop={(e) => handleChildDrop(e, id)}
          onDragOver={(e) => e.preventDefault()}
        >
          {type === "text" && <p>Text</p>}
          {type === "image" && <img src="image-url" alt="Image" />}
          {type === "section" &&
            children.map((child, index) => (
              <Box padding="1rem" key={child.id}>
                <DraggableElement
                  element={child}
                  itemLocation={[...itemLocation, index]}
                  templateElements={child.children}
                  setTemplateElements={setTemplateElements}
                  onRemove={removeElement}
                />
              </Box>
            ))}
        </div>
      </div>
      <button className="remove-button" onClick={() => onRemove(id)}>
        Remove
      </button>
    </div>
  );
}

export default DraggableElement;
