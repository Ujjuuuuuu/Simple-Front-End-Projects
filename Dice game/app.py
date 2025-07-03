from flask import Flask, render_template, jsonify
import random
import time

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/roll-dice')
def roll_dice():
    time.sleep(0.1)  # Small delay to ensure a fresh random value
    result = random.randint(1, 6)
    return jsonify({'result': result, 'timestamp': time.time()})  # Unique timestamp to prevent caching

if __name__ == '__main__':
    app.run(debug=True)
