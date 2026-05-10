from flask import Flask, jsonify
from flask_cors import CORS
import subprocess
import re

app = Flask(__name__)
CORS(app)  # Mengizinkan Frontend React mengakses API ini

def clean_output(text):
    """Membersihkan output terminal agar enak dibaca di web"""
    # Menghilangkan kode warna ANSI
    ansi_escape = re.compile(r'\x1B(?:[@-Z\\-_]|\[[0-?]*[ -/]*[@-~])')
    return ansi_escape.sub('', text)

@app.route('/')
def home():
    return jsonify({
        "status": "online",
        "message": "Leonore OSINT Engine is Running",
        "version": "1.0.0"
    })

@app.route('/api/email/<email>')
def scan_email(email):
    try:
        # Menjalankan holehe
        process = subprocess.run(['holehe', email, '--only-used', '--no-color'], 
                               capture_output=True, text=True)
        output = clean_output(process.stdout)
        
        # Sederhananya, kita kirim string mentah dulu untuk diproses di React
        return jsonify({
            "status": "success",
            "target": email,
            "tool": "holehe",
            "results": output
        })
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})

@app.route('/api/phone/<number>')
def scan_phone(number):
    try:
        # Menjalankan ignorant (+62 sebagai default Indonesia)
        process = subprocess.run(['ignorant', '+62', number], 
                               capture_output=True, text=True)
        output = clean_output(process.stdout)
        
        return jsonify({
            "status": "success",
            "target": number,
            "tool": "ignorant",
            "results": output
        })
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})

@app.route('/api/username/<username>')
def scan_username(username):
    try:
        # Menjalankan sherlock (pencarian cepat)
        process = subprocess.run(['sherlock', username, '--timeout', '1'], 
                               capture_output=True, text=True)
        output = clean_output(process.stdout)
        
        return jsonify({
            "status": "success",
            "target": username,
            "tool": "sherlock",
            "results": output
        })
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})

if __name__ == '__main__':
    # Berjalan di port 5000
    app.run(host='0.0.0.0', port=5000, debug=True)
