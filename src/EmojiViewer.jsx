import React, { useState, useEffect } from "react";
import emojisData from "./emojis.json"; // Assuming emojis.json is in the same directory

const EmojiViewer = () => {
  const [emojis, setEmojis] = useState([]);
  const [filteredEmojis, setFilteredEmojis] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  useEffect(() => {
    setEmojis(emojisData);
    setFilteredEmojis(emojisData);
  }, []);

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearchKeyword(keyword);
    const filtered = emojis.filter((emoji) =>
      emoji.keywords.split(" ").some((k) => k.includes(keyword))
    );
    setFilteredEmojis(filtered);
  };

  const copyToClipboard = (emoji) => {
    navigator.clipboard
      .writeText(emoji)
      .then(() => {
        setSnackbarVisible(true);
        setTimeout(() => {
          setSnackbarVisible(false);
        }, 3000);
      })
      .catch((error) =>
        console.error("Error copying emoji to clipboard:", error)
      );
  };

  return (
    <div className="emoji-viewer">
      <header>
        <h1>Emoji Viewer</h1>
        <input
          type="text"
          placeholder="Search emojis by keyword"
          value={searchKeyword}
          onChange={handleSearch}
        />
      </header>
      <div className="emoji-container">
        {filteredEmojis.map((emoji, index) => (
          <div
            key={index}
            className="emoji-item"
            title={emoji.name}
            onClick={() => copyToClipboard(emoji.symbol)}
          >
            {emoji.symbol}
          </div>
        ))}
      </div>
      {snackbarVisible && (
        <div className="snackbar">Emoji copied to clipboard!</div>
      )}
    </div>
  );
};

export default EmojiViewer;
