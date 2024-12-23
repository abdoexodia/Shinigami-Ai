from flask import Flask, request, jsonify
import openai
import pyttsx3
import moviepy.editor as mpy

app = Flask(__name__)

# Set OpenAI API key
openai.api_key = "viWH5-HIFqIWjvmKnNSpJGPeplkGAItr-0QmcFntXzSBv31g_aCDtMaYA"

@app.route('/generate/image', methods=['POST'])
def generate_image():
    prompt = request.json['prompt']
    response = openai.Image.create(prompt=prompt, n=1, size="1024x1024")
    return jsonify({'url': response['data'][0]['url']})

@app.route('/generate/video', methods=['POST'])
def generate_video():
    text = request.json['prompt']
    clip = mpy.TextClip(text, fontsize=70, color='white', bg_color='black', size=(1280, 720))
    clip = clip.set_duration(5)
    file_path = "output_video.mp4"
    clip.write_videofile(file_path, fps=24)
    return jsonify({'url': file_path})

@app.route('/generate/audio', methods=['POST'])
def generate_audio():
    text = request.json['prompt']
    engine = pyttsx3.init()
    file_path = "output_audio.mp3"
    engine.save_to_file(text, file_path)
    engine.runAndWait()
    return jsonify({'url': file_path})

if __name__ == "__main__":
    app.run(debug=True)
