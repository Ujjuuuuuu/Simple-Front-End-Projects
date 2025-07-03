from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Sample responses
responses = {
    "hi": "Hello User! How can I help you today?",
    "how are you?": "I'm doing great! How about you?",
    "i'm great! thanks": "That's good to hear, So how may I assist you today?",
    "bye": "Goodbye! Have a nice day!",
    "how is the weather in mumbai today?": "The weather in Mumbai is precisely warm with the weather being at 32°C",
    "default": "Sorry, I didn't get that. Could you please rephrase?",
    "joke": "Why don’t programmers like nature? It has too many bugs. 😂",
    "creator": "I was built by a genius (that’s you, obviously)! 💡",
    "who is the president of india?": "As of 2025, the President of India is Draupadi Murmu",
    "distance to moon": "The average distance from Earth to the Moon is about 384,400 km 🌕",
    "what is the capital of india?": "The capital of india is New Delhi",
      }

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_input = data.get("message", "").lower()
    reply = responses.get(user_input, responses["default"])
    return jsonify({"reply": reply})

if __name__ == "__main__":
    app.run(debug=True)
