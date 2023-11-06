import React, { useState, useEffect } from "react";
import "./App.css";

// Images
import GalleryImg1 from "./assets/images/image-1.webp";
import GalleryImg2 from "./assets/images/image-2.webp";
import GalleryImg3 from "./assets/images/image-3.webp";
import GalleryImg4 from "./assets/images/image-4.webp";
import GalleryImg5 from "./assets/images/image-5.webp";
import GalleryImg6 from "./assets/images/image-6.webp";
import GalleryImg7 from "./assets/images/image-7.webp";
import GalleryImg8 from "./assets/images/image-8.webp";
import GalleryImg9 from "./assets/images/image-9.webp";
import GalleryImg10 from "./assets/images/image-10.jpeg";
import GalleryImg11 from "./assets/images/image-11.jpeg";

// Icons
import CheckIcon from "./assets/images/check-icon.svg";
import GalleryIcon from "./assets/images/gallery-icon.png";

const App = () => {
  // Image Gallery Card Array
  const [cards, setCards] = useState([
    { id: 1, img: GalleryImg1, checked: false },
    { id: 2, img: GalleryImg2, checked: false },
    { id: 3, img: GalleryImg3, checked: false },
    { id: 4, img: GalleryImg4, checked: false },
    { id: 5, img: GalleryImg5, checked: false },
    { id: 6, img: GalleryImg6, checked: false },
    { id: 7, img: GalleryImg7, checked: false },
    { id: 8, img: GalleryImg8, checked: false },
    { id: 9, img: GalleryImg9, checked: false },
    { id: 10, img: GalleryImg10, checked: false },
    { id: 11, img: GalleryImg11, checked: false },
  ]);

  // Card Selected Function
  const toggleCheck = (id) => {
    const updatedCards = cards.map((card) =>
      card.id === id ? { ...card, checked: !card.checked } : card
    );
    setCards(updatedCards);
  };
  const deleteChecked = () => {
    const updatedCards = cards.filter((card) => !card.checked);
    setCards(updatedCards);
  };

  const selectedCount = cards.filter((card) => card.checked).length;

  //  Image Upload Function
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  useEffect(() => {
    if (selectedImage) {
      // Generate a unique ID for the new card
      const newId = Math.max(...cards.map((card) => card.id)) + 1;
      const newCard = {
        id: newId,
        img: URL.createObjectURL(selectedImage), // Use a temporary URL for the image
        checked: false,
      };

      // Update the cards state with the new card
      setCards([...cards, newCard]);

      // Reset the selected image state
      setSelectedImage(null);
    }
  }, [selectedImage, cards]);

  // Drag And Drop Function
  const [draggedCard, setDraggedCard] = useState(null);

  const handleDragStart = (e, card) => {
    setDraggedCard(card);
  };

  const handleDragEnd = () => {
    setDraggedCard(null);
  };

  const handleDragOver = (e, card) => {
    e.preventDefault();
    if (card.id !== draggedCard.id) {
      const updatedCards = cards.slice();
      const draggedIndex = updatedCards.findIndex(
        (c) => c.id === draggedCard.id
      );
      const targetIndex = updatedCards.findIndex((c) => c.id === card.id);
      updatedCards.splice(draggedIndex, 1);
      updatedCards.splice(targetIndex, 0, draggedCard);
      setCards(updatedCards);
    }
  };

  return (
    <>
      {/* Gallery Widget Area */}
      <section className="gallery-widget">
        <div className="gallery-widget-container">
          <div className="gallery-widget-head">
            {!selectedCount > 0 && <h2>Gallery</h2>}
            {selectedCount > 0 && (
              <div className="gallery-head-selected-info">
                <h2>
                  <img src={CheckIcon} alt="#" />
                  {selectedCount} File{selectedCount !== 1 ? "s" : ""} selected
                </h2>
                <button onClick={deleteChecked}>Delete files</button>
              </div>
            )}
          </div>
          <div className="gallery-widget-inner">
            <div className="gallery-widget-group">
              {/* Single Gallery Image Card */}
              {cards.map((card, index) => (
                <div
                  className={`single-image-widget box${index + 1} ${
                    card.checked ? "selected" : ""
                  }`}
                  key={card.id}
                  onDragOver={(e) => handleDragOver(e, card)}
                  onDragStart={(e) => handleDragStart(e, card)}
                  onDragEnd={handleDragEnd}
                  draggable
                >
                  <img src={card.img} alt="#" />
                  <div className="selected-input">
                    <input
                      type="checkbox"
                      checked={card.checked}
                      onChange={() => toggleCheck(card.id)}
                    />
                  </div>
                </div>
              ))}
              {/* Upload Image Box */}
              <div
                className="add-image-box"
                onClick={() => document.getElementById("imageUpload").click()}
              >
                <div className="add-image-box-info">
                  <img src={GalleryIcon} alt="#" />
                  <p>Add Images</p>
                  <input
                    type="file"
                    id="imageUpload"
                    accept=".jpeg, .jpg, .png, .webp" // Set accepted file types
                    style={{ display: "none" }}
                    onChange={handleImageUpload}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Gallery Widget Area */}
    </>
  );
};

export default App;
