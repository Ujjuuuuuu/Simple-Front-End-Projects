from flask import Flask, render_template, request, redirect, url_for
from datetime import datetime

app = Flask(__name__)

tasks = []  # Each task will have {"text": "Task name", "category": "Personal", "due_date": "YYYY-MM-DD"}

@app.route('/')
def home():
    today = datetime.today().strftime('%Y-%m-%d')  # Get today's date in YYYY-MM-DD format
    return render_template('index.html', tasks=tasks, today=today)

@app.route('/add', methods=['POST'])
def add_task():
    task_text = request.form.get('task')
    category = request.form.get('category')
    due_date = request.form.get('due_date')

    if task_text:
        tasks.append({"text": task_text, "category": category, "due_date": due_date})
    return redirect(url_for('home'))

@app.route('/delete/<int:task_id>')
def delete_task(task_id):
    if 0 <= task_id < len(tasks):
        del tasks[task_id]
    return redirect(url_for('home'))

if __name__ == '__main__':
    app.run(debug=True)
