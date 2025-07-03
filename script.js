body {
    font-family: Arial, sans-serif;
    text-align: center;
    background-color: #f0f0f0;
    margin: 0;
    padding: 20px;
}

h1, h2 {
    color: #333;
}

#wheel-container {
    margin: 20px auto;
}

#wheel {
    border: 2px solid #333;
    border-radius: 50%;
}

#select-gifts-button, #spin-button, #confirm-gifts {
    padding: 10px 20px;
    font-size: 18px;
    background-color: #ff6f61;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin: 10px;
}

#select-gifts-button:hover, #spin-button:hover, #confirm-gifts:hover {
    background-color: #e65b50;
}

#spin-button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

#gift-selection {
    background: white;
    border: 1px solid #ccc;
    padding: 20px;
    max-width: 400px;
    margin: 10px auto;
    border-radius: 5px;
}

.gift-checkbox {
    display: block;
    margin: 10px 0;
}

#result {
    margin-top: 20px;
    font-size: 24px;
    color: #333;
}
