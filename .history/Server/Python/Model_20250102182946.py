from flask import Flask, request, jsonify
from flask_cors import CORS
from apscheduler.schedulers.background import BackgroundScheduler
import requests

app = Flask(__name__)
CORS(app)

ACCOUNT_ID = "464f3b6cf22390814b0a4df20983fbd0"
AUTH_TOKEN = "iKem7NulKxuv-R2ZZ0FbAWueFH0AcBmFmmAznWXe"
LLM_API_URL = f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/@cf/mistral/mistral-7b-instruct-v0.2-lora"

headers = {
    "Authorization": f"Bearer {AUTH_TOKEN}",
    "Content-Type": "application/json",
    "X-Custom-Auth": "CustomAuthValue"
}

scheduler = BackgroundScheduler()

def start_scheduler():
    scheduler.add_job(func=lambda: print("Scheduler job running!"), trigger="interval", minutes=5)
    scheduler.start()

@app.route('/generate', methods=['POST'])
def generate():
    try:
        data = request.json
        if not data or "prompt" not in data:
            return jsonify({"error": "Missing 'prompt' in request body"}), 400

        prompt = data["prompt"]
        system_message = data.get("system_message", "")
        model_instructions = data.get("model_instructions", "")
        persona = data.get("persona", "")
        name = data.get("name", "")
        description = data.get("description", "")
        first_message = data.get("first_message", "")

        system_content = []
        if system_message:
            system_content.append(system_message)
        if name:
            system_content.append(f"Name: {name}")
        if description:
            system_content.append(f"Description: {description}") 
        if first_message:
            system_content.append(f"First Message: {first_message}")

        payload = {
            "messages": [
                {
                    "role": "system",
                    "content": "\n".join(system_content)
                },
                {"role": "user", "content": f"{{user}} {prompt}"} 
            ],
            "stream": False,
            "max_tokens": 500
        }

        response = requests.post(LLM_API_URL, headers=headers, json=payload)

        if response.status_code != 200:
            return jsonify({"error": "Failed to connect to LLM API", "details": response.text}), response.status_code

        return jsonify(response.json())

    except Exception as e:
        return jsonify({"error": "An error occurred", "details": str(e)}), 500

if __name__ == '__main__':
    start_scheduler()
    app.run(host='0.0.0.0', port=5000)